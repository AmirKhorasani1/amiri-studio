import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FiCpu, FiSend, FiUser, FiMessageCircle } from "react-icons/fi";

const suggestions = [
  "چه مهارت‌ها و تکنولوژی‌هایی بلدی؟",
  "درباره پروژه‌های امیر توضیح بده",
  "چرا از React و Vite استفاده شده؟",
];

const transport = new DefaultChatTransport({
  api: "/api/ai-chat",
});

const AiChat = () => {
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  const { messages, sendMessage, status, error } = useChat({ transport });

  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const submitMessage = async (value) => {
    const text = value.trim();
    if (!text || isBusy) return;

    setInput("");
    try {
      await sendMessage({ text });
    } catch {
      // The hook exposes request failures through its error state.
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitMessage(input);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <section
      id="ai-chat"
      dir="rtl"
      className="container mx-auto my-32 w-full px-4 sm:px-6"
      aria-labelledby="ai-chat-title"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-neutral-300/70 px-3 py-1.5 text-xs text-neutral-600 dark:border-neutral-700 dark:text-neutral-300">
            <FiCpu className="text-base" />
            دستیار هوشمند پورتفولیو
          </span>
          <h2
            id="ai-chat-title"
            className="text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl"
          >
            درباره مهارت‌ها و پروژه‌ها سؤال کن
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-neutral-600 dark:text-neutral-400 sm:text-base">
            درباره تجربه‌ها، تکنولوژی‌ها، نمونه‌کارها و همکاری با امیر بپرس.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white/80 shadow-xl shadow-neutral-900/5 dark:border-neutral-800 dark:bg-neutral-900/70 dark:shadow-black/20">
          <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                <FiMessageCircle size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Amiri AI
                </p>
                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                  پاسخ‌گو درباره پورتفولیو و توسعه نرم‌افزار
                </p>
              </div>
            </div>
            <span className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              آنلاین
            </span>
          </div>

          <div
            className="max-h-[480px] min-h-[250px] space-y-5 overflow-y-auto px-4 py-5 sm:px-6"
            aria-live="polite"
            aria-label="پیام‌های گفتگو"
          >
            {messages.length === 0 ? (
              <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
                  <FiCpu size={25} />
                </span>
                <h3 className="font-semibold text-neutral-900 dark:text-white">
                  سلام! چه چیزی می‌خواهی بدانی؟
                </h3>
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                  یکی از سؤال‌های زیر را انتخاب کن یا سؤال خودت را بنویس.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => submitMessage(suggestion)}
                      disabled={isBusy}
                      className="rounded-full border border-neutral-200 px-3 py-2 text-xs text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 sm:text-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => {
                const isUser = message.role === "user";
                const textParts = (message.parts || [])
                  .filter((part) => part.type === "text")
                  .map((part) => part.text);

                return (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <span
                      className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${isUser ? "bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-white" : "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"}`}
                    >
                      {isUser ? <FiUser size={15} /> : <FiCpu size={15} />}
                    </span>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7 ${isUser ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100"}`}
                    >
                      <div className="break-words [&_a]:underline [&_code]:rounded [&_code]:bg-black/5 [&_code]:px-1 [&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-black/5 [&_pre]:p-3 dark:[&_code]:bg-white/10 dark:[&_pre]:bg-black/30">
                        {textParts.map((part, index) => (
                          <ReactMarkdown key={index} remarkPlugins={[remarkGfm]}>
                            {part}
                          </ReactMarkdown>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {isBusy && (
              <div className="flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                  <FiCpu size={15} />
                </span>
                <span className="flex items-center gap-1">
                  در حال نوشتن پاسخ
                  <span className="animate-pulse">...</span>
                </span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {error && (
            <div
              role="alert"
              className="mx-4 mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs leading-6 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300 sm:mx-6"
            >
              ارسال پیام با خطا مواجه شد. اتصال بک‌اند و تنظیم بودن کلید Groq را بررسی کن و دوباره تلاش کن.
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="border-t border-neutral-200 bg-neutral-50/80 p-3 dark:border-neutral-800 dark:bg-neutral-950/40 sm:p-4"
          >
            <div className="flex items-end gap-2 rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm focus-within:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:focus-within:border-neutral-500">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isBusy}
                rows={1}
                maxLength={4000}
                placeholder="سؤالت را اینجا بنویس..."
                aria-label="متن پیام"
                className="max-h-32 min-h-11 flex-1 resize-y bg-transparent px-3 py-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 disabled:opacity-50 dark:text-white"
              />
              <button
                type="submit"
                disabled={!input.trim() || isBusy}
                aria-label="ارسال پیام"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-white transition hover:scale-105 hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                <FiSend size={17} />
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-neutral-400">
              پاسخ‌ها با هوش مصنوعی تولید می‌شوند و ممکن است نیاز به بررسی داشته باشند.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AiChat;
