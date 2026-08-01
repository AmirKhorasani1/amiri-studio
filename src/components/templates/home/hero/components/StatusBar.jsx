import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const formatTime = (date) =>
  date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

const formatWeekday = (date) =>
  date.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();

const formatDay = (date) =>
  `${date.getDate()} ${date
    .toLocaleDateString("en-US", { month: "long" })
    .toUpperCase()}`;

const Divider = () => (
  <span className="hidden h-4 w-px bg-neutral-800 sm:block" />
);

/**
 * نوار وضعیت بالای هیرو: تاریخ/ساعت زنده، وضعیت آنلاین، دکمه‌ی پروژه‌ها و یک بج زنده
 * مقادیر از طریق props قابل تغییرند تا بعداً راحت شخصی‌سازی بشن
 */
const StatusBar = ({
  name = "AMIR KHORASANI",
  ctaLabel = "SELECTED PROJECTS IN 2026",
  badgeValue = 9,
  badgeLabel = "NOW",
}) => {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    // هر ۳۰ ثانیه کافیه چون فقط ساعت:دقیقه نمایش داده می‌شه، نیازی به تیک هر ثانیه نیست
    const timer = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="hidden md:flex mb-3 w-full items-center justify-between gap-x-4 gap-y-3 bg-[#121212] p-4 rounded-lg"
    >
      {/* تاریخ و ساعت زنده */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col leading-5.5">
          <span className="text-xs font-medium text-white">
            {now ? formatWeekday(now) : "—"}
          </span>
          <span className="text-[10px] text-neutral-400">
            {now ? formatDay(now) : "—"}
          </span>
        </div>
        <span className="text-3xl font-medium text-white">
          {now ? formatTime(now) : "--:--"}
        </span>
      </div>

      {/* دکمه‌ی پروژه‌ها */}
      <button className="whitespace-nowrap rounded-full border border-neutral-700 px-3 py-1.5 text-[11px] font-medium tracking-wide text-neutral-300 duration-200 hover:border-neutral-500 hover:text-white">
        {ctaLabel}
      </button>
    </motion.div>
  );
};

export default StatusBar;