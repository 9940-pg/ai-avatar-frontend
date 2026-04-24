import React from "react";
import avatarVideo from "../assets/avatar.mp4";
import avatarImage from "../assets/avatar.png";

function Avatar({ isTalking, isListening }) {
  return (
    <div className="text-center mb-6 animate-[float_4s_ease-in-out_infinite]">

      <div
        className={`
          relative w-[270px] h-[270px] mx-auto rounded-full overflow-hidden
          border-4 transition-all duration-300
          ${isTalking
            ? "border-primary scale-105 shadow-[0_0_60px_rgba(59,130,246,0.8)]"
            : "border-borderSoft"}
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

      <p className="font-semibold mt-3 text-textSecondary">
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