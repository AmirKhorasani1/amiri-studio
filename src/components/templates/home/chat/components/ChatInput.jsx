import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@context/LanguageContext";
import { HiPlus } from "react-icons/hi2";
import { FaArrowUp } from "react-icons/fa6";
import { socket } from "@lib/socket";

const MAX_HEIGHT = 120;
const TYPING_DEBOUNCE_MS = 1500;

const translations = {
  en: {
    placeholder: "Type a message...",
    attach: "Attach file",
    send: "Send message",
  },
  fa: {
    placeholder: "پیامتان را بنویسید...",
    attach: "پیوست فایل",
    send: "ارسال پیام",
  },
};

const ChatInput = ({ onSend, sending, onAttach, conversationId }) => {
  const { language } = useLanguage();
  const isRTL = language === "fa";
  const t = translations[language] ?? translations.en;

  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`;
  };

  const stopTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    if (conversationId) {
      socket.emit("stop-typing", conversationId);
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
    resizeTextarea();

    if (!conversationId) return;

    socket.emit("typing", conversationId);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(
      stopTyping,
      TYPING_DEBOUNCE_MS
    );
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    const trimmed = text.trim();

    if (!trimmed || sending) return;

    stopTyping();
    onSend(trimmed);
    setText("");

    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      if (conversationId) {
        socket.emit("stop-typing", conversationId);
      }
    };
  }, [conversationId]);

  return (
    <form
      onSubmit={handleSubmit}
      dir={isRTL ? "rtl" : "ltr"}
      className="relative bg-transparent"
    >
      <div className="relative flex items-start">
        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={t.placeholder}
          disabled={sending}
          dir={isRTL ? "rtl" : "ltr"}
          aria-label={t.placeholder}
          className="
            no-scrollbar
            max-h-[120px]
            w-full
            resize-none
            overflow-y-auto
            rounded-4xl
            border
            border-neutral-200
            bg-neutral-100
            py-3.5
            pl-12
            pr-12
            text-sm
            text-neutral-900
            placeholder:text-neutral-400
            outline-none
            backdrop-blur-sm
            transition-colors
            focus:border-neutral-300
            focus:bg-neutral-50
            disabled:cursor-not-allowed
            disabled:opacity-50
            dark:border-white/10
            dark:bg-neutral-800/85
            dark:text-white
            dark:placeholder:text-neutral-500
            dark:focus:border-white/15
            dark:focus:bg-neutral-800
          "
        />

        {/* Attach — همیشه سمت چپ */}
        <button
          type="button"
          onClick={onAttach}
          aria-label={t.attach}
          className="
            absolute
            bottom-1.5
            left-1.5
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            text-neutral-500
            transition-colors
            hover:bg-neutral-200
            hover:text-neutral-900
            dark:text-neutral-400
            dark:hover:bg-white/10
            dark:hover:text-white
          "
        >
          <HiPlus size={20} />
        </button>

        {/* Send — همیشه سمت راست */}
        <button
          type="submit"
          disabled={!text.trim() || sending}
          aria-label={t.send}
          className="
            absolute
            bottom-1.5
            right-1.5
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-neutral-900
            text-white
            transition-all
            hover:scale-105
            hover:bg-black
            active:scale-95
            disabled:cursor-not-allowed
            disabled:opacity-30
            disabled:hover:scale-100
            dark:bg-white
            dark:text-black
            dark:hover:bg-neutral-200
          "
        >
          <FaArrowUp size={17} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;