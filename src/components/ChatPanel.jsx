import React, { useEffect, useRef, useState } from "react";

const ChatPanel = ({ chat, isTyping }) => {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const threshold = 50;
    const atBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

    setIsAtBottom(atBottom);
  };

  useEffect(() => {
    if (isAtBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat, isTyping, isAtBottom]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="w-full max-w-2xl mt-4 h-[280px] overflow-y-auto space-y-3 p-4 rounded-2xl
      backdrop-blur-lg bg-glass border border-borderSoft shadow-[0_0_40px_rgba(0,0,0,0.3)]"
    >
      {chat.map((c, i) => (
        <div key={i}>
          
          {/* USER */}
          {c.user && (
            <div className="flex justify-end">
              <div className="bg-primary text-white px-4 py-2 rounded-xl max-w-[70%] shadow-md">
                {c.user}
              </div>
            </div>
          )}

          {/* BOT */}
          {c.bot && (
            <div className="flex justify-start">
              <div className="bg-surface text-textPrimary px-4 py-3 rounded-xl max-w-[75%] border border-borderSoft">

                {/* TEXT */}
                {typeof c.bot === "string" && c.bot}

                {/* OBJECT (CARDS) */}
                {typeof c.bot === "object" && (
                  <>
                    {c.bot.message && (
                      <p className="mb-3">{c.bot.message}</p>
                    )}

                    {c.bot.type === "projects" && (
                      <div className="grid gap-4 mt-2">
                        {c.bot.data.map((proj, index) => (
                          <div
                            key={index}
                            className="p-3 rounded-xl bg-white/5 border border-white/10 
                            shadow-md hover:scale-[1.02] hover:shadow-xl transition duration-300"
                          >
                            {/* IMAGE */}
                            {proj.image && (
                              <img
                                src={proj.image}
                                alt={proj.title}
                                onError={(e) => {
                                  e.target.src = "/images/fallback.png";
                                }}
                                className="w-full h-40 object-cover rounded-lg mb-3"
                              />
                            )}

                            {/* TITLE */}
                            <h3 className="font-semibold text-lg mb-1">
                              {proj.title}
                            </h3>

                            {/* DESCRIPTION */}
                            <p className="text-sm text-gray-300">
                              {proj.description}
                            </p>

                            {/* TECH */}
                            <div className="flex flex-wrap gap-1 mt-3">
                              {proj.tech?.map((t, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-white/10 px-2 py-1 rounded-md"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>

                            {/* LINKS */}
                            <div className="flex gap-3 mt-4">
                              {proj.link && (
                                <a
                                  href={proj.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-3 py-1 text-sm bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition"
                                >
                                  🔗 Live
                                </a>
                              )}

                              {proj.github && (
                                <a
                                  href={proj.github}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-3 py-1 text-sm bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition"
                                >
                                  💻 Code
                                </a>
                              )}
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

      {isTyping && (
        <div className="text-sm text-textSecondary">
          Avatar is typing...
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatPanel;