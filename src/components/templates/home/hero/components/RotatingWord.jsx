import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ROTATE_INTERVAL_MS = 4000; // مکث بین تغییر کلمات (~3.5–4.5s)
const TRANSITION_SECONDS = 0.6; // مدت هر ترنزیشن (~500–700ms)
const EASE = [0.4, 0, 0.2, 1];

/**
 * <RotatingWord words={["purpose", "precision", "craft"]} />
 *
 * کلمات را با یک fade + blur + scale بسیار ظریف عوض می‌کند، بدون اینکه
 * تغییر طول کلمه باعث جابه‌جایی بقیه‌ی متن اطراف شود (عرض به‌صورت خودکار
 * بر اساس بلندترین کلمه اندازه‌گیری و ثابت می‌شود).
 */
export default function RotatingWord({
  words = [],
  className = "",
  colorClassName = "text-white",
  underline = true,
  underlineClassName = "bg-neutral-600",
}) {
  const [index, setIndex] = useState(0);
  const [boxWidth, setBoxWidth] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const measureRefs = useRef([]);

  // اگر words پاس داده نشود یا خالی باشد، چیزی رندر نمی‌کنیم تا کرش نکند
  const safeWords = Array.isArray(words) ? words : [];

  // احترام به prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handleChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  // اندازه‌گیری عرض بلندترین کلمه تا Layout Shift رخ ندهد
  const measure = useCallback(() => {
    const widths = measureRefs.current.map((el) => (el ? el.offsetWidth : 0));
    if (widths.length) setBoxWidth(Math.max(...widths));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeWords.join("|")]);

  // چرخه‌ی خودکار کلمات — با cleanup کامل در unmount
  useEffect(() => {
    if (safeWords.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % safeWords.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [safeWords]);

  if (safeWords.length === 0) return null;

  const current = safeWords[index];

  const variants = reducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, filter: "blur(6px)", scale: 0.96, y: 5 },
        animate: { opacity: 1, filter: "blur(0px)", scale: 1, y: 0 },
        exit: { opacity: 0, filter: "blur(6px)", scale: 0.96, y: -5 },
      };

  return (
    <span
      className="relative inline-block align-baseline"
      style={{
        width: boxWidth ? `${boxWidth}px` : "auto",
        transition: "width 0.3s ease",
        textAlign: "start",
      }}
    >
      {/* اندازه‌گیر مخفی: همه‌ی کلمات با همان استایل، برای محاسبه‌ی عرض ثابت */}
      <span
        className="absolute invisible pointer-events-none whitespace-nowrap"
        aria-hidden="true"
      >
        {safeWords.map((word, i) => (
          <span
            key={word}
            ref={(el) => (measureRefs.current[i] = el)}
            className={`inline-block ${className}`}
          >
            {word}
          </span>
        ))}
      </span>

      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          className={`relative inline-block whitespace-nowrap ${colorClassName} ${className}`}
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={{
            duration: reducedMotion ? 0.15 : TRANSITION_SECONDS,
            ease: EASE,
          }}
        >
          {current}
          {underline && (
            <motion.span
              aria-hidden="true"
              className={`absolute -bottom-1 h-1 rounded-full ${underlineClassName}`}
              // style={{ width: "100%", insetInlineStart: 0 }}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scaleX: 0.85 }}
              animate={reducedMotion ? { opacity: 0.5 } : { opacity: 0.5, scaleX: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scaleX: 0.85 }}
              transition={{
                duration: reducedMotion ? 0.15 : TRANSITION_SECONDS,
                ease: EASE,
              }}
            />
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}