import React from "react";
import {
  HiOutlineArrowUpRight,
} from "react-icons/hi2";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTelegram,
} from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";

const NewBadge = () => (
  <span className="ml-2 inline-flex items-center rounded-full bg-neutral-800 px-2 py-0.5 text-[10px] font-semibold text-white">
    New
  </span>
);

const FooterLink = ({ label, href = "#", isNew = false, external = false }) => (
  <li>
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group inline-flex items-center text-sm text-neutral-400 transition-colors duration-200 hover:text-white"
    >
      {label}
      {isNew && <NewBadge />}
      {external && (
        <HiOutlineArrowUpRight
          size={13}
          className="ml-1 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all duration-200 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100"
        />
      )}
    </a>
  </li>
);

const FooterColumn = ({ title, links }) => (
  <div>
    <h1 className="text-sm font-semibold text-white">{title}</h1>
    <ul className="mt-4 flex flex-col gap-3">
      {links.map((link) => (
        <FooterLink key={link.label} {...link} />
      ))}
    </ul>
  </div>
);

const columns = [
  {
    title: "Projects",
    links: [
      { label: "Fitsaz", href: "#", isNew: true },
      { label: "Sports Store", href: "#" },
      { label: "Gym Admin Panel", href: "#" },
      { label: "Live Chat App", href: "#", isNew: true },
      { label: "Portfolio v2", href: "#" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "React", href: "#" },
      { label: "Next.js", href: "#" },
      { label: "Tailwind CSS", href: "#" },
      { label: "Node.js", href: "#" },
      { label: "MongoDB", href: "#" },
      { label: "Figma", href: "#" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "GitHub", href: "https://github.com", external: true },
      { label: "LinkedIn", href: "https://linkedin.com", external: true },
      { label: "Instagram", href: "https://instagram.com", external: true },
      { label: "Telegram", href: "https://t.me", external: true },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Blog", href: "#" },
      { label: "About", href: "#" },
      { label: "Resume", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const socials = [
  { icon: FaGithub, href: "https://github.com", label: "GitHub" },
  { icon: RiTwitterXFill, href: "https://x.com", label: "X" },
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaTelegram, href: "https://t.me", label: "Telegram" },
];

const Footer = () => {
  return (
    <footer className="border-t border-neutral-900 container">
      <div className="mx-auto px-5 py-14 md:px-8 md:px-10">
        {/* Columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-4 md:gap-x-10">
          {columns.map((col) => (
            <FooterColumn key={col.title} title={col.title} links={col.links} />
          ))}
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-neutral-900" />

        {/* Bottom row */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 transition-colors duration-200 hover:border-neutral-600 hover:text-white"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;