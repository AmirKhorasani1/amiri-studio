// ChatInput.jsx
import { useRef, useState } from "react";
import { HiPaperAirplane, HiPlus } from "react-icons/hi2";
import { RiSendInsFill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";

const MAX_HEIGHT = 120;

const ChatInput = ({ onSend, sending, onAttach }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`;
  };

  const handleChange = (e) => {
    setText(e.target.value);
    resizeTextarea();
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    onSend(trimmed);
    setText("");

    requestAnimationFrame(() => {
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent">
      <div className="relative flex items-start">
        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={sending}
          className="no-scrollbar max-h-[120px] w-full resize-none overflow-y-auto rounded-4xl
            border border-white/10 bg-neutral-900 py-3.5 pl-12 pr-12
            text-sm text-white placeholder:text-neutral-500 outline-none
            transition-colors
            disabled:opacity-50"
        />

        <button
          type="button"
          onClick={onAttach}
          aria-label="Attach file"
          className="absolute bottom-1.5 left-1.5 flex h-9 w-9 items-center
            justify-center rounded-full text-neutral-400
            transition-colors hover:bg-white/10 hover:text-white"
        >
          <HiPlus size={18} />
        </button>

        <button
          type="submit"
          disabled={!text.trim() || sending}
          aria-label="Send message"
          className="absolute bottom-1.5 right-1.5 flex h-9 w-9 items-center
            justify-center rounded-full bg-white text-black
            transition-all hover:scale-105 active:scale-95
            disabled:cursor-not-allowed disabled:opacity-30
            disabled:hover:scale-100"
        >
          <IoSend size={20} className={`${text.length > 0 ? "" : "rotate-90"}`} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;