import React from "react";

const SnippetVaultCard = () => {
  return (
    <div className="group relative h-[290px] w-full overflow-hidden rounded-lg border border-[#303030]">
      {/* Text */}
      <div className="absolute bottom-42 md:bottom-6 z-10 left-6">
        <h1 className="text-[24px] font-medium tracking-[-0.04em] text-white sm:text-[26px]">
          Snippet Vault
        </h1>

        <p className="mt-1.5 text-[14px] leading-[1.45] text-[#adadad] max-w-80 sm:text-[16px]">
          Discover reusable snippets, speed up development, and copy
          production-ready code.
        </p>
      </div>

      {/* Terminal */}
      <div
        className="
          absolute -bottom-5 right-0 md:top-8 w-[64%]
          origin-bottom-right rounded-tl-xl border border-[#262626]
          bg-[#101010] p-3 font-mono text-[11.5px] leading-[1.6]
          text-[#f5f5f5] transition-transform duration-500
          ease-[cubic-bezier(.22,1,.36,1)]
          group-hover:-rotate-2
          sm:w-[55%] sm:p-4 md:text-[15px] md:leading-[1.75]
        "
      >
        <p>
          <span className="mr-2 text-[#42d1f5]">✓</span>
          React
        </p>

        <p className="mb-4 text-sm text-neutral-400">
          const [theme, setTheme] = useState("dark");
        </p>

        <p className="hidden md:block">
          <span className="mr-2 text-[#ffffff]">✓</span>
          Next.js
        </p>

        <p className="hidden md:block mb-4 text-sm text-neutral-400">
          <pre>
            {`export const metadata = {
  title: "Portfolio",
};`}
          </pre>
        </p>

        <p>
          <span className="mr-2 text-[#48f39d]">✓</span>
          Tailwind
        </p>

        <p className="mb-4 text-sm text-neutral-400">
          className="rounded-xl bg-zinc-900 p-6"
        </p>
      </div>
    </div>
  );
};

export default SnippetVaultCard;