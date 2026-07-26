import React, { useState } from "react";
import {
  HiPaperClip,
  HiFaceSmile,
  HiMicrophone,
  HiPaperAirplane,
} from "react-icons/hi2";
import AttachmentMenu from "./AttachmentMenu";

const MessageInput = ({ onSend }) => {
  const [value, setValue] = useState("");
  const [attachOpen, setAttachOpen] = useState(false);

  const handleSend = () => {
    if (!value.trim()) return;
    onSend?.(value.trim());
    setValue("");
  };

  return (
    <div className="relative flex items-center gap-2 border-t border-neutral-800 bg-neutral-950 px-3 py-3">
      <button
        onClick={() => setAttachOpen((o) => !o)}
        aria-label="Add attachment"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-white"
      >
        <HiPaperClip size={19} />
      </button>

      <AttachmentMenu
        isOpen={attachOpen}
        onClose={() => setAttachOpen(false)}
        onSelect={(key) => console.log("attach:", key)}
      />

      <div className="flex flex-1 items-center rounded-full bg-neutral-900 px-3 py-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Message"
          className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 outline-none"
        />
        <button
          aria-label="Emoji"
          className="flex h-7 w-7 shrink-0 items-center justify-center text-neutral-400 hover:text-white"
        >
          <HiFaceSmile size={18} />
        </button>
      </div>

      <button
        onClick={value.trim() ? handleSend : undefined}
        aria-label={value.trim() ? "Send message" : "Voice message"}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white transition-transform hover:scale-105 active:scale-95"
      >
        {value.trim() ? (
          <HiPaperAirplane size={17} className="rotate-90" />
        ) : (
          <HiMicrophone size={18} />
        )}
      </button>
    </div>
  );
};

export default MessageInput;