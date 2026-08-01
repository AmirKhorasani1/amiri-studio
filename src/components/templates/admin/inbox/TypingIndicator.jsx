// TypingIndicator.jsx
const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-full border border-neutral-800 bg-[#181818] px-4 py-3">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-500 [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-500 [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-500" />
      </div>
    </div>
  );
};

export default TypingIndicator;