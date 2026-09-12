import React from "react";
import { useLanguage } from "@context/LanguageContext";
import { Link } from "react-router-dom";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTelegram,
} from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";

const translations = {
  en: {
    about: {
      title: "About Me",
      text: "Frontend developer focused on building clean, responsive, and thoughtful digital experiences. I enjoy turning ideas into practical products with attention to detail.",
    },
    links: {
      title: "Useful Links",
      rules: "Guidelines",
      support: "Support",
      about: "About",
      contact: "Contact",
    },
    courses: {
      title: "Recommended",
      react: "React",
      next: "Next.js",
      tailwind: "Tailwind CSS",
      javascript: "JavaScript",
    },
    contact: {
      title: "Get in Touch",
      github: "GitHub",
      linkedin: "LinkedIn",
      instagram: "Instagram",
      telegram: "Telegram",
    },
    built: "Built pixel by pixel by Amir",
    copyright: "© 2026 Amir Khorasani. All rights reserved.",
  },

  fa: {
    about: {
      title: "درباره من",
      text: "توسعه‌دهنده فرانت‌اند با تمرکز روی ساخت تجربه‌های دیجیتال تمیز، واکنش‌گرا و کاربردی. از تبدیل ایده‌ها به محصولات واقعی و توجه به جزئیات لذت می‌برم.",
    },
    links: {
      title: "لینک‌های مفید",
      rules: "قوانین و مقررات",
      support: "پشتیبانی",
      about: "درباره من",
      contact: "تماس با من",
    },
    courses: {
      title: "پیشنهادهای یادگیری",
      react: "آموزش React",
      next: "آموزش Next.js",
      tailwind: "آموزش Tailwind CSS",
      javascript: "آموزش JavaScript",
    },
    contact: {
      title: "ارتباط با من",
      github: "GitHub",
      linkedin: "LinkedIn",
      instagram: "Instagram",
      telegram: "Telegram",
    },
    built: "ساخته‌شده با دقت، پیکسل به پیکسل توسط امیر",
    copyright: "© ۲۰۲۶ امیر خراسانی. تمامی حقوق محفوظ است.",
  },
};

const socialLinks = [
  {
    icon: FaGithub,
    href: "https://github.com",
    label: "GitHub",
  },
  {
    icon: RiTwitterXFill,
    href: "https://x.com",
    label: "X",
  },
  {
    icon: FaLinkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    icon: FaTelegram,
    href: "https://t.me",
    label: "Telegram",
  },
];

const FooterLink = ({
  children,
  to = "#",
  external = false,
}) => {
  const className =
    "group inline-flex items-center gap-1 text-sm text-neutral-500 transition-colors duration-200 hover:text-black dark:text-neutral-400 dark:hover:text-white";

  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}

        <HiOutlineArrowUpRight
          size={13}
          className="translate-x-0.5 -translate-y-0.5 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
        />
      </a>
    );
  }

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

const Footer = () => {
  const { language } = useLanguage();

  const t = translations[language];
  const isRTL = language === "fa";

  return (
    <footer
      dir={isRTL ? "rtl" : "ltr"}
      className="w-full"
    >
      <div className="container pb-10">
        {/* Main Footer */}
        <div className="flex flex-col gap-10 border-t border-neutral-200 pt-16 dark:border-neutral-800/80 lg:flex-row lg:items-start lg:justify-between">
          {/* About + Socials */}
          <div className="max-w-sm">
            <h2 className="text-lg font-semibold text-neutral-950 dark:text-white">
              {t.about.title}
            </h2>

            <p className="mt-5 text-sm leading-7 text-neutral-500 dark:text-neutral-400">
              {t.about.text}
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-5">
              {socialLinks.map(
                ({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-neutral-500 transition-colors duration-200 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                  >
                    <Icon size={22} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Link Columns */}
          <div className="flex flex-wrap gap-x-16 gap-y-10">
            {/* Useful Links */}
            <div>
              <h2 className="text-lg font-semibold text-neutral-950 dark:text-white">
                {t.links.title}
              </h2>

              <ul className="mt-5 flex flex-col gap-4">
                <li>
                  <FooterLink to="/">
                    {t.links.rules}
                  </FooterLink>
                </li>

                <li>
                  <FooterLink to="/">
                    {t.links.support}
                  </FooterLink>
                </li>

                <li>
                  <FooterLink to="/">
                    {t.links.about}
                  </FooterLink>
                </li>

                <li>
                  <FooterLink to="/">
                    {t.links.contact}
                  </FooterLink>
                </li>
              </ul>
            </div>

            {/* Recommended */}
            <div>
              <h2 className="text-lg font-semibold text-neutral-950 dark:text-white">
                {t.courses.title}
              </h2>

              <ul className="mt-5 flex flex-col gap-4">
                <li>
                  <FooterLink to="/tools">
                    {t.courses.react}
                  </FooterLink>
                </li>

                <li>
                  <FooterLink to="/tools">
                    {t.courses.next}
                  </FooterLink>
                </li>

                <li>
                  <FooterLink to="/tools">
                    {t.courses.tailwind}
                  </FooterLink>
                </li>

                <li>
                  <FooterLink to="/tools">
                    {t.courses.javascript}
                  </FooterLink>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-lg font-semibold text-neutral-950 dark:text-white">
                {t.contact.title}
              </h2>

              <div className="mt-5 flex flex-col gap-4">
                <FooterLink
                  to="https://github.com"
                  external
                >
                  {t.contact.github}
                </FooterLink>

                <FooterLink
                  to="https://linkedin.com"
                  external
                >
                  {t.contact.linkedin}
                </FooterLink>

                <FooterLink
                  to="https://instagram.com"
                  external
                >
                  {t.contact.instagram}
                </FooterLink>

                <FooterLink
                  to="https://t.me"
                  external
                >
                  {t.contact.telegram}
                </FooterLink>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center gap-3 border-t border-neutral-200 pt-8 sm:flex-row sm:justify-between dark:border-neutral-800/80">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {t.built}

            <span className="mx-1 text-neutral-400 dark:text-neutral-300">
              ♥
            </span>
          </p>

          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;