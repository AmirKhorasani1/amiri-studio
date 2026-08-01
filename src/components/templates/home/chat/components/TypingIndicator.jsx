// TypingIndicator.jsx
const TypingIndicator = () => {
  return (
    <div className="mb-1.5 flex justify-start">
      <div className="relative">
        <div className="flex items-center gap-1.5 rounded-full bg-[#222222] p-4">
          <span
            className="typing-dot h-1.5 w-1.5 rounded-full bg-neutral-300"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="typing-dot h-1.5 w-1.5 rounded-full bg-neutral-300"
            style={{ animationDelay: "0.15s" }}
          />
          <span
            className="typing-dot h-1.5 w-1.5 rounded-full bg-neutral-300"
            style={{ animationDelay: "0.3s" }}
          />
        </div>

        {/* same tail as the received-message bubble, for visual consistency */}
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
      </div>
    </div>
  );
};

export default TypingIndicator;