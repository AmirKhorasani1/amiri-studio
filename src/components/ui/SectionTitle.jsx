import { motion } from "framer-motion";
import { useLanguage } from "@context/LanguageContext";

/**
 * @param {string} eyebrow   - متن کوچک بالای عنوان (مثلاً "/ 01" یا "About Me")
 * @param {string} title     - عنوان اصلی بخش
 * @param {string} highlight - بخشی از عنوان که می‌خواهید با رنگ متفاوت نمایش داده شود (باید عیناً داخل title هم باشد)
 * @param {string} description - توضیح کوتاه زیر عنوان (اختیاری)
 * @param {"left"|"center"} align - چینش متن، پیش‌فرض "left" (در فارسی به‌صورت خودکار راست‌چین می‌شود)
 */

const SectionTitle = ({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
}) => {
  const { language } = useLanguage();

  const alignClass =
    align === "center"
      ? "items-center text-center mx-auto"
      : "text-center items-center";

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
      className={`flex flex-col gap-3 ${alignClass}`}
    >
      {eyebrow && (
        <span className="text-sm font-medium tracking-wide text-neutral-500">
          {eyebrow}
        </span>
      )}

      <h2
        className="max-w-2xl rtl:leading-[1.3] ltr:leading-[1.2] md:rtl:leading-[1.3] md:ltr:leading-[1.05] text-black dark:text-white rtl:text-[30px] ltr:text-[32px] md:ltr:text-[37px]  md:rtl:text-[37px]"
        style={{
          letterSpacing: language === "fa" ? "normal" : "-0.03em",
          fontWeight: language === "fa" ? 500 : 480,
        }}
      >
        {renderTitle()}
      </h2>

      {description && (
        <p className="text-[15px] md:text-[17px] text-neutral-600 dark:text-neutral-500 font-normal leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;