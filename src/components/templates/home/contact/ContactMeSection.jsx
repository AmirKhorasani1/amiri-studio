import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaWhatsapp } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { RiTelegram2Fill } from "react-icons/ri";
import { SiGmail } from "react-icons/si";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { Phone } from "lucide-react";
import { useLanguage } from "@context/LanguageContext";
import SectionTitle from "@ui/SectionTitle";

const translations = {
  en: {
    title: "Ready to get started?",
    description: "Have a project to build, improve, or take to the next level? Let’s talk about it.",
    chat: "Start a conversation",
    cards: {
      github: { label: "GitHub", meta: "@yourusername" },
      email: { label: "Email", meta: "you@example.com" },
      phone: { label: "Phone", meta: "+98 913 963 4709" },
      instagram: { label: "Instagram", meta: "@yourusername" },
      telegram: { label: "Telegram", meta: "@yourusername" },
      whatsapp: { label: "WhatsApp", meta: "+98 913 963 4709" },
    },
  },
  fa: {
    title: "آماده‌اید شروع کنیم؟",
    description: "پروژه‌ای برای ساخت، توسعه یا بهبود دارید؟ بیایید درباره‌اش صحبت کنیم.",
    chat: "شروع گفتگو",
    cards: {
      github: { label: "گیت‌هاب", meta: "@yourusername" },
      email: { label: "ایمیل", meta: "you@example.com" },
      phone: { label: "تماس تلفنی", meta: "+98 913 963 4709" },
      instagram: { label: "اینستاگرام", meta: "@yourusername" },
      telegram: { label: "تلگرام", meta: "@yourusername" },
      whatsapp: { label: "واتساپ", meta: "+98 913 963 4709" },
    },
  },
};

const CARD_ITEMS = [
  { id: "github", Icon: FaGithub, href: "https://github.com/yourusername" },
  { id: "email", Icon: SiGmail, href: "mailto:you@example.com" },
  { id: "phone", Icon: Phone, href: "tel:09139634709" },
  { id: "instagram", Icon: AiFillInstagram, href: "https://instagram.com/yourusername" },
  { id: "telegram", Icon: RiTelegram2Fill, href: "https://t.me/yourusername" },
  { id: "whatsapp", Icon: FaWhatsapp, href: "https://wa.me/989139634709" },
];

// Fires once when the grid enters the viewport, used to stagger the card animation
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
};

const ContactCard = ({ Icon, copy, href, isRTL, index, inView }) => {
  const isExternal = href.startsWith("http");
  const row = Math.floor(index / 3); // stagger delay per row (3 cols on md+)

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      style={{ transitionDelay: inView ? `${row * 120 + (index % 3) * 60}ms` : "0ms" }}
      className={`group flex justify-between rounded-full bg-neutral-100 p-2 backdrop-blur-3xl transition-all duration-700 ease-out hover:bg-neutral-200 dark:bg-neutral-800/80 dark:hover:bg-neutral-800 ${
        inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-700">
          <Icon className="size-6 text-neutral-500 transition-colors duration-300 group-hover:text-neutral-950 dark:text-neutral-400 dark:group-hover:text-white" />
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="text-[15px] font-medium text-neutral-950 dark:text-white">{copy.label}</span>
          <span className="truncate text-xs text-neutral-500 dark:text-neutral-500">{copy.meta}</span>
        </div>
      </div>

      <HiOutlineArrowSmRight
        className={`h-11.5 w-11.5 shrink-0 self-center rounded-full bg-neutral-200 p-2.5 text-neutral-500 transition-transform duration-300 dark:bg-neutral-800 dark:text-neutral-400 ${
          isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
        }`}
      />
    </a>
  );
};

const ContactSection = ({ onOpenChat }) => {
  const { language } = useLanguage();
  const t = translations[language] ?? translations.en;
  const isRTL = language === "fa";
  const [gridRef, inView] = useInView();

  return (
    <section dir={isRTL ? "rtl" : "ltr"} className="relative w-full overflow-hidden py-35">
      <div className="pointer-events-none absolute inset-0 -z-10 container">
        <img
          className="h-full w-full invert dark:invert-0 object-cover opacity-15 brightness-75 dark:opacity-20 dark:brightness-30"
          src="src/assets/images/vecteezy_world-map-template-with-continents-north-and-south-america_5420386-1.jpg"
          alt=""
        />
      </div>

      <div className="container relative z-10 flex w-full flex-col gap-15">
        <div>
          <SectionTitle title={t.title} description={t.description} />

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={onOpenChat}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
            >
              {t.chat}
              <HiOutlineArrowSmRight size={18} className={isRTL ? "rotate-180" : ""} />
            </button>
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-4.5">
          {CARD_ITEMS.map(({ id, Icon, href }, index) => (
            <ContactCard key={id} index={index} inView={inView} Icon={Icon} href={href} copy={t.cards[id]} isRTL={isRTL} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;