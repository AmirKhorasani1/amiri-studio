// src/components/chat/ChatListItem.jsx
import React from "react";
import { HiMiniSpeakerXMark, HiMiniMapPin } from "react-icons/hi2";

const ChatListItem = ({ chat, isActive, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(chat.id)}
      className={`
        flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-right
        transition-colors duration-150
        ${isActive ? "bg-violet-600" : "hover:bg-neutral-900"}
      `}
    >
      <div
        className={`
          flex h-12 w-12 shrink-0 items-center justify-center
          rounded-full text-base font-semibold text-white
          ${chat.color}
        `}
      >
        {chat.initial}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`truncate text-sm font-semibold ${
              isActive ? "text-white" : "text-neutral-100"
            }`}
          >
            {chat.name}
          </span>
          <span
            className={`shrink-0 text-xs ${
              isActive ? "text-white/80" : "text-neutral-500"
            }`}
          >
            {chat.time}
          </span>
        </div>

        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p
            className={`truncate text-xs ${
              isActive ? "text-white/80" : "text-neutral-400"
            }`}
          >
            {chat.lastMessage}
          </p>

          <div className="flex shrink-0 items-center gap-1">
            {chat.muted && (
              <HiMiniSpeakerXMark
                size={14}
                className={isActive ? "text-white/70" : "text-neutral-500"}
              />
            )}
            {chat.pinned && (
              <HiMiniMapPin
                size={12}
                className={`rotate-45 ${
                  isActive ? "text-white/70" : "text-neutral-500"
                }`}
              />
            )}
            {chat.unread > 0 && (
              <span
                className={`
                  flex h-5 min-w-5 items-center justify-center rounded-full
                  px-1.5 text-[11px] font-semibold
                  ${isActive ? "bg-white text-violet-600" : "bg-violet-600 text-white"}
                `}
              >
                {chat.unread}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ChatListItem;