import { useState } from "react";
import { useLanguage } from "@context/LanguageContext";

const MessageBubble = ({ text, sender, createdAt }) => {
  const { language } = useLanguage();
  const isRTL = language === "fa";
  const isVisitor = sender === "visitor";
  const [showTime, setShowTime] = useState(false);

  const time = new Date(createdAt).toLocaleTimeString(
    isRTL ? "fa-IR" : "en-US",
    { hour: "2-digit", minute: "2-digit" }
  );

  return (
    <div className="mb-1.5 flex w-full flex-col">
      <div
        className={`relative max-w-[78%] ${
          isVisitor ? "ml-auto mr-0" : "ml-0 mr-auto"
        }`}
      >
        <div
          dir={isRTL ? "rtl" : "ltr"}
          onClick={() => setShowTime((prev) => !prev)}
          className={`relative cursor-pointer select-none rounded-[22px] px-4 py-2 text-[15px] leading-7 shadow-sm transition-transform duration-200 active:scale-95 ${
            isVisitor
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "bg-neutral-200 text-black dark:bg-[#222] dark:text-white"
          }`}
        >
          <p className="whitespace-pre-wrap break-words text-start">
            {text}
          </p>
        </div>

        <svg
          className={`absolute bottom-0 ${
            isVisitor ? "-right-1" : "-left-1 scale-x-[-1]"
          }`}
          width="18"
          height="22"
          viewBox="0 0 18 22"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 2 C7 2 12 5 13 10 C14 14 15 18 17 21 C13 20 9 19 5 16 C2 13 1 9 1 2Z"
            className={
              isVisitor
                ? "fill-black dark:fill-white"
                : "fill-neutral-200 dark:fill-[#222]"
            }
          />
        </svg>
      </div>

      <div
        className={`grid transition-all duration-300 ease-out ${
          showTime
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        } ${isVisitor ? "ml-auto mr-0" : "ml-0 mr-auto"}`}
      >
        <div className="overflow-hidden">
          <span
            dir={isRTL ? "rtl" : "ltr"}
            className={`mt-1 block px-1 text-[11px] text-neutral-500 transition-transform duration-300 dark:text-neutral-400 ${
              showTime ? "translate-y-0" : "-translate-y-1"
            }`}
          >
            {time}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;