// ChatHeader.jsx
import React from "react";
import { HiXMark } from "react-icons/hi2";
import { AiOutlineFullscreen } from "react-icons/ai";

const ChatHeader = ({ title, subtitle, avatarUrl, onClose }) => {
  return (
    <div
      className="
        absolute -inset-x-1 -top-1 z-20
        flex items-center justify-between gap-2 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent
      "
    >
      <button
        onClick={onClose}
        aria-label="Close chat"
        className="flex h-12 w-12 bg-neutral-900 shrink-0 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
      >
        <HiXMark size={25} />
      </button>

      <div className="flex gap-2 items-center bg-neutral-900 p-1.5 pr-4 rounded-full">
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

      <div className="min-w-0 flex-1">
        <p className="truncate text-[14.5px] font-semibold text-white">{title}</p>
        {subtitle && (
          <p className="truncate text-xs text-neutral-400">{subtitle}</p>
        )}
      </div>
      </div>

      <button className="flex h-12 w-12 bg-neutral-900 shrink-0 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-white/10 hover:text-white">
        <AiOutlineFullscreen size={25}/>
      </button>
    </div>
  );
};

export default ChatHeader;