import React, { useEffect, useRef, useState } from "react";

const ChatPanel = ({ chat, isTyping }) => {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const threshold = 120; // 🔥 increased for better UX
    const atBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

    setIsAtBottom(atBottom);
  };

  // 🔥 Improved auto-scroll
useEffect(() => {
  if (isAtBottom) {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  }
}, [chat, isTyping, isAtBottom]); // ✅ fixed

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="
        w-full 
        max-w-md md:max-w-lg
        mt-4 
        h-[200px] sm:h-[240px] md:h-[300px]
        overflow-y-auto 
        space-y-3 
        p-3 md:p-4
        rounded-2xl
        backdrop-blur-lg
        bg-white/5
        border border-white/10
        shadow-[0_10px_30px_rgba(0,0,0,0.25)]
      "
    >
      {chat.map((c, i) => (
        <div key={i}>

          {/* USER */}
          {c.user && (
            <div className="flex justify-end">
              <div className="bg-primary text-white px-3 py-2 rounded-xl max-w-[80%] text-sm">
                {c.user}
              </div>
            </div>
          )}

          {/* BOT */}
          {c.bot && (
            <div className="flex justify-start">
              <div className="bg-white/10 text-white px-3 py-2 rounded-xl max-w-[85%] border border-white/10 text-sm">

                {/* TEXT */}
                {typeof c.bot === "string" && c.bot}

                {/* OBJECT */}
                {typeof c.bot === "object" && (
                  <>
                    {c.bot.message && (
                      <p className="mb-2">{c.bot.message}</p>
                    )}

                    {c.bot.type === "projects" && (
                      <div className="grid gap-3 mt-2">
                        {c.bot.data.map((proj, index) => (
                          <div
                            key={index}
                            className="p-3 rounded-xl bg-white/5 border border-white/10"
                          >
                            {proj.image && (
                              <img
                                src={proj.image}
                                alt={proj.title}
                                className="w-full h-28 object-cover rounded-lg mb-2"
                              />
                            )}

                            <h3 className="font-semibold text-base">
                              {proj.title}
                            </h3>

                            <p className="text-xs opacity-80">
                              {proj.description}
                            </p>

                            <div className="flex flex-wrap gap-1 mt-2">
                              {proj.tech?.map((t, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] px-2 py-1 rounded bg-white/10"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Typing indicator */}
      {isTyping && (
        <div className="text-xs opacity-60">
          Avatar is typing...
            Avatar is typing...
        </div>
        
      )}

      {/* Scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatPanel;