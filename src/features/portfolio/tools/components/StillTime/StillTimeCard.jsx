import React, { useEffect, useState } from "react";

const getCurrentTime = () => {
  const now = new Date();

  return [
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
  ].join("");
};

const StillTimeCard = () => {
  const [time, setTime] = useState(getCurrentTime);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="group relative w-full h-[280px] md:h-full overflow-hidden rounded-lg border border-[#292929]">
      {/* Header */}
      <div className="absolute left-6 right-6 top-6 z-10 flex items-start justify-between">
        <div>
          <h1 className="text-[27px] font-medium tracking-[-0.05em] text-white">
            StillTime
          </h1>

          <p className="mt-1 text-[16px] leading-[1.45] text-[#a3a3a3]">
            A distraction-free clock, timer, and stopwatch built for focused work sessions.
          </p>
        </div>
      </div>

      {/* Live clock */}
      <time
        dateTime={new Date().toISOString()}
        aria-label={`Current time: ${time.slice(0, 2)}:${time.slice(2)}`}
        className="absolute inset-x-0 bottom-0 top-[120px] grid grid-cols-4"
      >
        {time.split("").map((digit, index) => (
          <div
            key={`${index}-${digit}`}
            className="relative overflow-hidden border-r-2 border-transparent"
          >
            <span
              className={[
                "absolute left-1/2 -translate-x-1/2 scale-x-[0.9] duration-300 group-hover:scale-101 group-hover:text-neutral-500 text-neutral-600",
                "whitespace-nowrap text-[155px] md:text-[390px] font-bold leading-[0.76]",
                index % 2 === 0 ? "top-[30px] md:top-[50px]" : "top-[60px] md:top-[128px]",
              ].join(" ")}
            >
              {digit}
            </span>
          </div>
        ))}
      </time>
    </div>
  );
};

export default StillTimeCard;