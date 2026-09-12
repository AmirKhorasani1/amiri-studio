import { useEffect, useRef } from "react";

const TECHS = [
  "HTML",
  "CSS",
  "Tailwind CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Redux",
  "Git & Github",
  "WebSocket",
  "REST API",
  "state management | zustand",
  "state management | react-query",
];

function TechItem({ name }) {
  return (
    <div className="group flex shrink-0 cursor-pointer items-center rounded-full bg-neutral-100 px-5 py-2.5 transition-colors duration-300 hover:bg-neutral-900/5 dark:bg-neutral-800/80 dark:hover:bg-white/[0.06]">
      <span className="whitespace-nowrap text-sm font-medium text-neutral-500 transition-colors duration-300 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white md:text-base">
        {name}
      </span>
    </div>
  );
}

function TechSet({ hidden = false }) {
  return (
    // فاصله‌ها دقیقاً تنظیم شده‌اند تا با عرض کل همخوانی داشته باشند
    <div
      aria-hidden={hidden}
      className="flex shrink-0 items-center gap-4 pr-4 sm:gap-6 sm:pr-6 md:gap-8 md:pr-8"
    >
      {TECHS.map((name) => (
        <TechItem key={name} name={name} />
      ))}
    </div>
  );
}

export default function TechMarquee() {
  return (
    <>
      {/* 
        استفاده از CSS Keyframes برای حرکت فوق‌روان.
        چون ۴ مجموعه در پایین قرار دادیم، وقتی به -25% می‌رسد،
        دقیقاً معادل یک مجموعه کامل جابجا شده است و ریست شدن آن کاملا نامرئی خواهد بود.
      */}
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); } 
        }
        .animate-marquee-scroll {
          /* می‌توانید 30s را برای تغییر سرعت کم و زیاد کنید */
          animation: marquee-scroll 30s linear infinite; 
        }
        .animate-marquee-scroll:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-scroll {
            animation: none;
          }
        }
      `}</style>

      <div
        className="relative -mx-4 w-full overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        {/* کانتینر چرخنده با ۴ کپی برای پوشش دادن کامل هر سایز مانیتوری بدون پرش */}
        <div className="flex w-max shrink-0 items-center animate-marquee-scroll">
          <TechSet />
          <TechSet hidden />
          <TechSet hidden />
          <TechSet hidden />
        </div>
      </div>
    </>
  );
}