import React from "react";
import avatarVideo from "../assets/avatar.mp4";
import avatarImage from "../assets/avatar.png";

function Avatar({ isTalking, isListening }) {
  return (
    <div className="text-center mb-4 animate-[float_4s_ease-in-out_infinite]">

      <div
        className={`
          relative 
          w-[240px] h-[240px]      /* 📱 mobile big */
          sm:w-[220px] sm:h-[220px]
          md:w-[190px] md:h-[190px] /* 💻 smaller desktop */
          mx-auto rounded-full overflow-hidden
          border transition-all duration-300
          backdrop-blur-md
          ${isTalking
            ? "border-primary scale-105 shadow-[0_0_40px_rgba(59,130,246,0.5)]"
            : "border-white/10"}
        `}
      >

        {/* IMAGE */}
        <img
          src={avatarImage}
          alt="avatar"
          className={`
            absolute inset-0 w-full h-full object-cover
            transition-opacity duration-500
            ${isTalking ? "opacity-0" : "opacity-100"}
          `}
        />

        {/* VIDEO */}
        <video
          src={avatarVideo}
          autoPlay
          loop
          muted
          playsInline
          className={`
            absolute inset-0 w-full h-full object-cover
            transition-opacity duration-500
            ${isTalking ? "opacity-100" : "opacity-0"}
          `}
        />

      </div>

      <p className="text-sm font-medium mt-2 text-textSecondary">
        {isTalking
          ? "Speaking..."
          : isListening
          ? "Listening..."
          : "Idle..."}
      </p>

    </div>
  );
}

export default Avatar;