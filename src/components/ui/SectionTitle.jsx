import { motion } from "framer-motion";

/**
 * @param {string} eyebrow   - متن کوچک بالای عنوان (مثلاً "/ 01" یا "About Me")
 * @param {string} title     - عنوان اصلی بخش
 * @param {string} highlight - بخشی از عنوان که می‌خواهید با رنگ متفاوت نمایش داده شود (باید عیناً داخل title هم باشد)
 * @param {string} description - توضیح کوتاه زیر عنوان (اختیاری)
 * @param {"left"|"center"} align - چینش متن، پیش‌فرض "left"
 */

const SectionTitle = ({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
}) => {
  const alignClass =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  const renderTitle = () => {
    if (!highlight || !title.includes(highlight)) return title;

    const [before, after] = title.split(highlight);
    return (
      <>
        {before}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-indigo-400">
          {highlight}
        </span>
        {after}
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col gap-4 ${alignClass}`}
    >
      {eyebrow && (
        <span className="text-sm font-medium tracking-wide text-neutral-500">
          {eyebrow}
        </span>
      )}

      <h2
        className="max-w-2xl leading-[1.2] md:leading-[1.05] tracking-[-1em] text-white text-[39px] md:text-[52px]"
        style={{ letterSpacing: "-0.03em", fontWeight: 480 }}
      >
        {renderTitle()}
      </h2>

      {description && (
        <p className="text-[16px] text-neutral-400 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;