const TypingIndicator = () => (
  <div className="mb-1.5 flex justify-start" dir="ltr">
    <div className="relative">
      <div className="flex items-center gap-1.5 rounded-full bg-neutral-200 p-4 dark:bg-[#222]">
        {[0, 0.15, 0.3].map((delay) => (
          <span
            key={delay}
            className="typing-dot h-1.5 w-1.5 rounded-full bg-neutral-500 dark:bg-neutral-300"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </div>

      <svg
        className="absolute bottom-0 -left-1 scale-x-[-1]"
        width="18"
        height="22"
        viewBox="0 0 18 22"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M1 2
            C7 2 12 5 13 10
            C14 14 15 18 17 21
            C13 20 9 19 5 16
            C2 13 1 9 1 2Z"
          className="fill-neutral-200 dark:fill-[#222]"
        />
      </svg>
    </div>
  </div>
);

export default TypingIndicator;