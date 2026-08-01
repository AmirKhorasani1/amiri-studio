import { useState } from "react";

const MessageBubble = ({ text, sender, createdAt }) => {
  const isVisitor = sender === "visitor";
  const [showTime, setShowTime] = useState(false);

  const time = new Date(createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`mb-1.5 flex flex-col ${isVisitor ? "items-end" : "items-start"}`}>
      <div className="relative max-w-[78%]">
        <div
          onClick={() => setShowTime((prev) => !prev)}
          className={`
            relative cursor-pointer select-none rounded-full px-4 py-2 text-[15px] leading-7 shadow-sm
            transition-transform duration-200 active:scale-95
            ${
              isVisitor
                ? "bg-white text-black"
                : "bg-[#222222] text-white"
            }
          `}
        >
          <p className="whitespace-pre-wrap">{text}</p>
        </div>

        {isVisitor ? (
          <svg
            className="absolute bottom-0 -right-1"
            width="18"
            height="22"
            viewBox="0 0 18 22"
            fill="none"
          >
            <path
              d="M1 2
              C7 2 12 5 13 10
              C14 14 15 18 17 21
              C13 20 9 19 5 16
              C2 13 1 9 1 2Z"
              fill="white"
            />
          </svg>
        ) : (
          <svg
            className="absolute bottom-0 -left-1 -z-10 scale-x-[-1]"
            width="18"
            height="22"
            viewBox="0 0 18 22"
            fill="none"
          >
            <path
              d="M1 2
              C7 2 12 5 13 10
              C14 14 15 18 17 21
              C13 20 9 19 5 16
              C2 13 1 9 1 2Z"
              fill="#222222"
            />
          </svg>
        )}
      </div>

      {/* time reveal — grid-rows trick animates height from 0 to auto smoothly */}
      <div
        className={`
          grid transition-all duration-300 ease-out
          ${showTime ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
        `}
      >
        <div className="overflow-hidden">
          <span
            className={`
              mt-1 block px-1 text-[11px] text-neutral-400
              transition-transform duration-300 ease-out
              ${showTime ? "translate-y-0" : "-translate-y-1"}
            `}
          >
            {time}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;