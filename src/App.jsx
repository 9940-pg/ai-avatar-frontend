import React, { useState, useEffect, useRef } from "react";
import Avatar from "./components/Avatar";
import ChatPanel from "./components/ChatPanel";
import { FaMicrophone } from "react-icons/fa";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isTalking, setIsTalking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [voices, setVoices] = useState([]);
  const [started, setStarted] = useState(false);

  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);

  // ✅ API URL FIX (CRA compatible)
  const API_URL =
    process.env.REACT_APP_API_URL || "http://localhost:5000";

  // ---------------- VOICES ----------------
  useEffect(() => {
    const loadVoices = () => {
      const allVoices = speechSynthesis.getVoices();
      if (allVoices.length > 0) setVoices(allVoices);
    };
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const getFemaleVoice = () => {
    return (
      voices.find(v => v.name === "Google UK English Female") ||
      voices.find(v => v.name === "Google US English") ||
      voices.find(v => v.lang === "en-US")
    );
  };

  // ---------------- 🔥 BACKEND WARMUP ----------------
  useEffect(() => {
    fetch(`${API_URL}`)
      .then(() => console.log("Backend ready"))
      .catch(() => console.log("Backend waking..."));
  }, [API_URL]);

  // ---------------- SPEAK ----------------
  const speak = (text) => {
    if (!text) return;

    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.stop();
    }

    const speech = new SpeechSynthesisUtterance(text);
    const voice = getFemaleVoice();
    if (voice) speech.voice = voice;

    speech.pitch = 1.3;
    speech.rate = 1.1;

    setIsTalking(true);

    speech.onend = () => {
      setIsTalking(false);
      startListening();
    };

    speechSynthesis.cancel();
    setTimeout(() => speechSynthesis.speak(speech), 100);
  };

  // ---------------- LISTEN ----------------
  const startListening = async () => {
    if (isTalking) return;

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      alert("Please allow microphone access");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Use Chrome");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;

      clearTimeout(silenceTimerRef.current);

      setChat(prev => [...prev, { user: text }]);
      sendMessage(text);
    };

    recognition.onerror = () => {
      setIsListening(false);
      setTimeout(() => startListening(), 1500);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (!isTalking && started) {
        setTimeout(() => startListening(), 1200);
      }
    };

    silenceTimerRef.current = setTimeout(() => {
      if (!isTalking) recognition.stop();
    }, 5000);

    try {
      recognition.start();
    } catch {}
  };

  // ---------------- TYPING EFFECT ----------------
  const typeMessage = (text) => {
    let index = 0;
    let current = "";
    let startedSpeaking = false;

    setIsTyping(true);

    const interval = setInterval(() => {
      current += text[index];
      index++;

      setChat(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { bot: current };
        return updated;
      });

      if (!startedSpeaking && current.length > 20) {
        speak(text);
        startedSpeaking = true;
      }

      if (index >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 18);
  };

  // ---------------- HANDLE BOT RESPONSE ----------------
  const handleBotResponse = (reply) => {
    if (!reply) return;

    // TEXT
    if (typeof reply === "string") {
      setChat(prev => [...prev, { bot: "" }]);
      typeMessage(reply);
      return;
    }

    // CARDS
    if (typeof reply === "object") {
      setChat(prev => [...prev, { bot: reply }]);

      if (reply.message) {
        speak(reply.message);
      }
    }
  };

  // ---------------- SEND MESSAGE ----------------
  const sendMessage = async (text) => {
    try {
      const res = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: text })
      });

      // ❗ handle backend failure
      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();
      handleBotResponse(data.reply);

    } catch (err) {
      console.error("API ERROR:", err);

      handleBotResponse(
        "Server is waking up or something went wrong. Try again in a moment."
      );
    }
  };

  // ---------------- TEXT INPUT ----------------
  const sendTextMessage = () => {
    if (!message) return;

    setChat(prev => [...prev, { user: message }]);
    const text = message;
    setMessage("");

    sendMessage(text);
  };

  // ---------------- START ----------------
  const handleStart = () => {
    setStarted(true);

    const intro =
      "Hey, I am Priyanka. I am a full stack developer. You can ask me about my projects, skills, or experience.";

    setChat(prev => [...prev, { bot: "" }]);
    typeMessage(intro);

    setTimeout(() => {
      startListening();
    }, 4000);
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-background text-textPrimary">

      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accentLight bg-clip-text text-transparent">
        AI Avatar Assistant
      </h2>

      <Avatar isTalking={isTalking} isListening={isListening} />

      {!started && (
        <button
          onClick={handleStart}
          className="mt-6 w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:scale-110 active:scale-95"
        >
          <FaMicrophone size={22} />
        </button>
      )}

      {started && (
        <>
          <ChatPanel chat={chat} isTyping={isTyping} />

          <div className="flex w-full max-w-2xl mt-4 gap-2 p-2 rounded-2xl backdrop-blur-lg bg-glass border border-borderSoft">

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="(Optional) Type..."
              className="flex-1 p-3 rounded-xl bg-transparent border border-borderSoft outline-none text-textPrimary"
            />

            <button
              onClick={sendTextMessage}
              className="px-6 rounded-xl font-semibold bg-primary hover:bg-primaryDark text-white transition"
            >
              Send
            </button>

          </div>
        </>
      )}
    </div>
  );
}

export default App;