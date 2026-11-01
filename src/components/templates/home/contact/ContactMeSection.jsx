import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
    phone: "Call me",
    cards: {
      github: { label: "GitHub", description: "Explore my projects, experiments, and open-source work.", meta: "@yourusername" },
      email: { label: "Email", description: "Have a project in mind? Send me an email and let's talk.", meta: "you@example.com" },
      instagram: { label: "Instagram", description: "Follow my work, projects, and the things I build.", meta: "@yourusername" },
      telegram: { label: "Telegram", description: "Connect with me directly and let's start a conversation.", meta: "@yourusername" },
      whatsapp: { label: "WhatsApp", description: "Send me a direct message and tell me about your project.", meta: "+98 913 963 4709" },
    },
  },
  fa: {
    title: "آماده‌اید شروع کنیم؟",
    description: "پروژه‌ای برای ساخت، توسعه یا بهبود دارید؟ بیایید درباره‌اش صحبت کنیم.",
    chat: "شروع گفتگو",
    phone: "تماس تلفنی",
    cards: {
      github: { label: "گیت‌هاب", description: "پروژه‌ها، تجربه‌ها و کارهای متن‌باز من را مشاهده کنید.", meta: "@yourusername" },
      email: { label: "ایمیل", description: "پروژه‌ای در ذهن دارید؟ برای من ایمیل بفرستید تا صحبت کنیم.", meta: "you@example.com" },
      instagram: { label: "اینستاگرام", description: "کارها، پروژه‌ها و چیزهایی که می‌سازم را دنبال کنید.", meta: "@yourusername" },
      telegram: { label: "تلگرام", description: "مستقیماً با من در ارتباط باشید و گفتگو را شروع کنید.", meta: "@yourusername" },
      whatsapp: { label: "واتساپ", description: "مستقیماً پیام دهید و درباره پروژه‌تان با من صحبت کنید.", meta: "+98 913 963 4709" },
    },
  },
};

const CARD_ITEMS = [
  { id: "github", Icon: FaGithub, href: "https://github.com/yourusername" },
  { id: "email", Icon: SiGmail, href: "mailto:you@example.com" },
  { id: "instagram", Icon: AiFillInstagram, href: "https://instagram.com/yourusername" },
  { id: "telegram", Icon: RiTelegram2Fill, href: "https://t.me/yourusername" },
  { id: "whatsapp", Icon: FaWhatsapp, href: "https://wa.me/989139634709" },
];

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(entry.target);
      }
    }, { threshold });
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
};

const ContactCard = ({ Icon, copy, href, index, inView, isRTL }) => {
  const isExternal = href.startsWith("http");

  return (
    <Link
      to={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      style={{ transitionDelay: inView ? `${index * 80}ms` : "0ms" }}
      className={`group flex h-[270px] w-full min-w-0 flex-col rounded-4xl bg-neutral-200/80 p-7 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-neutral-200 dark:bg-neutral-800/80 dark:hover:bg-neutral-800 ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
    >
      <div>
        <div className="flex size-8 items-center justify-start text-neutral-500 transition-colors duration-300 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-200">
          <Icon className="size-7" />
        </div>

        <div className="mt-7 flex items-center gap-2">
          <span className="text-[18px] font-medium leading-none tracking-tight text-neutral-950 dark:text-white">
            {copy.label}
          </span>
          <HiOutlineArrowSmRight className={`size-[18px] text-neutral-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white ${isRTL ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
        </div>

        <p className="mt-3 max-w-[220px] text-[15px] leading-6 text-neutral-500 dark:text-neutral-400">
          {copy.description}
        </p>
      </div>

      <span className="mt-auto text-[14px] text-neutral-500 dark:text-neutral-400">
        {copy.meta}
      </span>
    </Link>
  );
};

const ContactSection = ({ onOpenChat }) => {
  const { language } = useLanguage();
  const t = translations[language] ?? translations.en;
  const isRTL = language === "fa";
  const [cardsRef, inView] = useInView();

  const handlePhoneClick = () => {
    window.location.href = "tel:09139634709";
  };

  return (
    <section dir={isRTL ? "rtl" : "ltr"} className="relative w-full overflow-hidden pb-30">
      <div className="container relative z-10 flex w-full flex-col gap-12 md:gap-15">
        <div>
          <SectionTitle title={t.title} description={t.description} />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenChat}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
            >
              <span>{t.chat}</span>
              <HiOutlineArrowSmRight className={`size-[18px] transition-transform duration-300 ${isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
            </button>

            <button
              type="button"
              onClick={handlePhoneClick}
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-neutral-100/80 px-5 py-3 text-sm font-medium text-neutral-800 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-white dark:hover:bg-neutral-800"
            >
              <Phone className="size-[17px] transition-transform duration-300 group-hover:rotate-6" />
              <span>{t.phone}</span>
            </button>
          </div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CARD_ITEMS.map(({ id, Icon, href }, index) => (
            <ContactCard
              key={id}
              Icon={Icon}
              copy={t.cards[id]}
              href={href}
              index={index}
              inView={inView}
              isRTL={isRTL}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;