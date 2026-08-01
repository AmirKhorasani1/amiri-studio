import React from "react";
import { HiOutlineArrowDownTray, HiCheck } from "react-icons/hi2";

const ReadTicks = () => (
  <span className="relative inline-flex items-center">
    <HiCheck size={13} className="text-white/80" />
    <HiCheck size={13} className="-ml-1.5 text-white/80" />
  </span>
);

const MessageBubble = ({ message }) => {
  if (message.type === "unread-divider") {
    return (
      <div className="my-3 flex items-center justify-center">
        <span className="rounded-full bg-neutral-800 px-3 py-1 text-[11px] font-medium text-neutral-300">
          Unread messages
        </span>
      </div>
    );
  }

  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
          isMe
            ? "rounded-br-md bg-violet-600 text-white"
            : "rounded-bl-md border border-neutral-800 bg-neutral-900 text-neutral-100"
        }`}
      >
        {message.type === "media" ? (
          <div className="w-56">
            <div className="relative mb-2 flex h-32 items-center justify-center rounded-xl bg-neutral-950/40 text-xs text-white/70">
              <span className="absolute left-2 top-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px]">
                {message.duration}
              </span>
              <HiOutlineArrowDownTray size={22} className="text-white/80" />
            </div>
            <p className="mb-1 text-[13px] font-semibold">{message.title}</p>
            <p className="text-xs text-white/70">{message.caption}</p>
          </div>
        ) : (
          <p>{message.content}</p>
        )}

        <div className={`mt-1 flex items-center gap-1 text-[10px] ${isMe ? "justify-end text-white/70" : "justify-start text-neutral-500"}`}>
          <span>{message.time}</span>
          {isMe && message.seen && <ReadTicks />}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;