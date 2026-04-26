import React, { useState, useEffect, useRef } from "react";
import Avatar from "./components/Avatar";
import ChatPanel from "./components/ChatPanel";
import { FaMicrophone } from "react-icons/fa";

const App = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isTalking, setIsTalking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [voices, setVoices] = useState([]);
  const [started, setStarted] = useState(false);

  const recognitionRef = useRef(null);

  const API_URL =
    process.env.REACT_APP_API_URL || "http://localhost:5000";

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const isVoiceSupported = !!SpeechRecognition;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

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

  // ---------------- SPEAK ----------------
  const speak = (text) => {
    if (!text) return;

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const speech = new SpeechSynthesisUtterance(text);
    const voice = getFemaleVoice();
    if (voice) speech.voice = voice;

    speech.pitch = 1.2;
    speech.rate = 1.05;

    setIsTalking(true);

    speech.onend = () => {
      setIsTalking(false);
    };

    speechSynthesis.cancel();
    setTimeout(() => speechSynthesis.speak(speech), 100);
  };

  // ---------------- LISTEN ----------------
const startListening = async () => {
  if (!isVoiceSupported || isMobile) {
    alert("Voice input is not supported on your device. Please type instead.");
    return;
  }

  if (isTalking) return;

  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch {
    alert("Please allow microphone access");
    return;
  }

  if (recognitionRef.current) {
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
    setChat(prev => [...prev, { user: text }]);
    sendMessage(text);
  };

  recognition.onend = () => setIsListening(false);
  recognition.onerror = () => setIsListening(false);

  try {
    recognition.start();
  } catch {}
};

  // ---------------- TYPING ----------------
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

  // ---------------- RESPONSE ----------------
  const handleBotResponse = (reply) => {
    if (!reply) return;

    if (typeof reply === "string") {
      setChat(prev => [...prev, { bot: "" }]);
      typeMessage(reply);
      return;
    }

    if (typeof reply === "object") {
      setChat(prev => [...prev, { bot: reply }]);
      if (reply.message) speak(reply.message);
    }
  };

  // ---------------- SEND ----------------
  const sendMessage = async (text) => {
    try {
      const res = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      handleBotResponse(data.reply);

    } catch {
      handleBotResponse("Server is waking up. Try again.");
    }
  };

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
      "Hey, I am Priyanka. I am a full stack developer.";

    setChat(prev => [...prev, { bot: "" }]);
    typeMessage(intro);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-4 bg-background text-textPrimary">

      {/* 🔹 Smaller heading */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center">
        AI Avatar Assistant
      </h2>

      <Avatar isTalking={isTalking} isListening={isListening} />

      {!started && (
        <button
          onClick={handleStart}
          className="mt-6 w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white shadow-md hover:scale-105 transition"
        >
          <FaMicrophone size={18} />
        </button>
      )}

      {started && (
        <>
          <ChatPanel chat={chat} isTyping={isTyping} />

          {/* 🔥 MATCHED WIDTH + SOFT BORDER */}
         <div
  className="
    flex 
    w-full 
    max-w-md md:max-w-lg
    mt-4 
    gap-2 
    p-2 
    rounded-2xl 
    bg-white/5 
    border border-white/10
    backdrop-blur-md

    items-center        /* ✅ vertical alignment */
    overflow-hidden     /* ✅ prevents child overflow */
  "
>

           <input
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  placeholder="Type..."
  className="
    flex-1 
    min-w-0          /* 🔥 MOST IMPORTANT FIX */
    p-2 
    rounded-xl 
    bg-transparent 
    border border-white/10 
    outline-none 
    text-sm
  "
/>

  {isVoiceSupported && (
  <button
    onClick={startListening}
    className={`
      shrink-0
      w-10 h-10              /* 🔥 equal width & height */
      rounded-full          /* 🔥 makes it perfectly round */
      bg-primary 
      text-white 
      flex items-center justify-center
      ${isListening ? "animate-pulse" : ""}
    `}
  >
    <FaMicrophone size={16} />
  </button>
)}

<button
  onClick={sendTextMessage}
  className="
    shrink-0
    px-3 
    py-2
    rounded-xl 
    bg-primary 
    text-white 
    text-sm 
    whitespace-nowrap
    flex items-center justify-center   /* ✅ ADD THIS */
  "
>
  Send
</button>

          </div>
        </>
      )}
    </div>
  );
};

export default App;