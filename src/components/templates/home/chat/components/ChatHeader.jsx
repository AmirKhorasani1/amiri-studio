// ChatHeader.jsx
import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { PiDotsThreeVerticalBold } from "react-icons/pi";

const ChatHeader = ({ title, subtitle, avatarUrl, onClose, onProfileClick }) => {
  return (
    <div
      className="
        absolute inset-x-0 top-0 z-20
        flex items-center justify-between gap-2 bg-gradient-to-b from-black md:from-[#0a0a0a] via-black md:via-[#0a0a0a]/80 to-transparent
      "
    >
      <button
        onClick={onClose}
        aria-label="Close chat"
        className="flex h-12.5 w-12.5 bg-neutral-800/85 backdrop-blur-xs shrink-0 items-center justify-center rounded-full text-neutral-300 transition-colors active:scale-95 duration-300 hover:bg-white/30 active:bg-white/30 hover:text-white"
      >
        <IoIosArrowRoundBack size={32} />
      </button>

      <button
        onClick={onProfileClick}
        aria-label="View profile"
        className="flex gap-2 items-center bg-neutral-800/85 backdrop-blur-xs p-1.5 pr-4 rounded-full transition-colors hover:bg-white/30 active:bg-white/30"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={title}
            className="h-10.5 w-10.5 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
            {title?.charAt(0)}
          </div>
        )}

        <div className="min-w-0 flex-1 text-left">
          <p className="truncate text-[14.5px] font-semibold text-white">{title}</p>
          {subtitle && (
            <p className="truncate text-xs text-neutral-400">{subtitle}</p>
          )}
        </div>
      </button>

      <button className="flex h-12.5 w-12.5 bg-neutral-800/85 backdrop-blur-xs shrink-0 items-center justify-center rounded-full text-neutral-300 transition-colors active:scale-95 duration-300 hover:bg-white/30 active:bg-white/30 hover:text-white">
        <PiDotsThreeVerticalBold size={29} />
      </button>
    </div>
  );
};

export default ChatHeader;