import React from "react";
import { HiPhone } from "react-icons/hi2";
import { BsChatFill } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { RiTelegram2Fill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";

const badges = [
  { label: "Comments", color: "bg-blue-600" },
  { label: "CMS Drafts", color: "bg-purple-600" },
  { label: "Accessibility", color: "bg-emerald-600" },
  { label: "Share", color: "bg-pink-600" },
  { label: "Feature Flags", color: "bg-teal-600" },
  { label: "Collaborators", color: "bg-amber-500" },
  { label: "Layout Shift", color: "bg-red-500" },
];

const avatars = [
  { ring: "ring-orange-500", bg: "bg-orange-400" },
];

const Toolbar = () => (
  <div className="flex items-center gap-3.5 rounded-full border border-neutral-700 bg-neutral-800 px-4 py-3 text-white sm:gap-4 sm:px-6">
    <HiPhone size={21} className="shrink-0" aria-hidden="true" />
    <div className="relative shrink-0">
      <BsChatFill size={21} aria-hidden="true" />
      <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
    </div>

    <span className="h-5 w-px shrink-0 bg-neutral-700" />

    <SiGmail size={21} className="shrink-0" aria-hidden="true"/>
    <FaGithub size={21} className="shrink-0" aria-hidden="true"/>

    <span className="h-5 w-px shrink-0 bg-neutral-700" />

    <div className="flex shrink-0 -space-x-2">
      {avatars.map((a, i) => (
        <span
          key={i}
          className={`h-7 w-7 rounded-full ${a.bg} ring-2 ${a.ring} ring-offset-2 ring-offset-[#0d0d0d]`}
        />
      ))}
    </div>

    <span className="h-5 w-px shrink-0 bg-neutral-700" />

    <RiTelegram2Fill size={21} className="shrink-0" aria-hidden="true" />
    <FaInstagram size={21} className="shrink-0" aria-hidden="true" />
    <FaWhatsapp size={21} className="shrink-0" aria-hidden="true" />
  </div>
);

const Badge = ({ label, color, className = "" }) => (
  <span
    className={`whitespace-nowrap rounded-lg ${color} px-2 py-1.5 text-xs md:text-sm font-medium text-white ${className}`}
  >
    {label}
  </span>
);

const DeploymentHero = () => {
  return (
    <section className="relative overflow-hidden mx-auto w-full max-w-7xl mt-10">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto px-4 pb-24 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        {/* ===== Desktop / tablet: absolute floating layout ===== */}
        <div className="relative mx-auto hidden h-[260px] max-w-4xl md:block">
          <Badge label="Comments" color="bg-blue-600" className="absolute left-[5%] top-[8%]" />
          <Badge label="CMS Drafts" color="bg-purple-600" className="absolute left-[28%] top-0" />
          <Badge label="Accessibility" color="bg-emerald-600" className="absolute left-[52%] top-0" />
          <Badge label="Share" color="bg-pink-600" className="absolute right-[3%] top-[8%]" />

          <div className="absolute left-1/2 top-[22%] -translate-x-1/2">
            <Toolbar />
          </div>

          <Badge label="Feature Flags" color="bg-teal-600" className="absolute left-[6%] top-[64%]" />
          <Badge label="Collaborators" color="bg-amber-500" className="absolute left-[38%] top-[66%]" />
          <Badge label="Layout Shift" color="bg-red-500" className="absolute right-[8%] top-[63%]" />
        </div>

        {/* ===== Mobile: stacked, wrapped layout ===== */}
        <div className="mx-auto flex max-w-md flex-col items-center gap-6 md:hidden">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Badge label="Telegram" color="bg-blue-600" className="-rotate-6"/>
            <Badge label="Github" color="bg-purple-600" className="mb-5"/>
            <Badge label="WhatsApp" color="bg-emerald-600" className="mb-5"/>
            <Badge label="Instagram" color="bg-pink-600" className="rotate-6"/>
          </div>

          <div className="w-full overflow-x-auto my-2">
            <div className="flex w-max min-w-full justify-center">
              <Toolbar />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Badge label="Phone number" color="bg-teal-600" className="rotate-5"/>
            <Badge label="Email" color="bg-red-500" className="mt-5"/>
            <Badge label="Message me" color="bg-amber-500" className="-rotate-6"/>
          </div>
        </div>

        {/* ===== Heading + copy ===== */}
        <div className="relative mx-auto mt-16 max-w-2xl text-center md:mt-10">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Contact Me
          </h1>

          <p className="mt-6 text-base text-neutral-400 sm:text-lg">
            Traditional deployment tools weren&apos;t built for frontend development.
            <br className="hidden sm:block" />
            Get the <span className="font-semibold text-neutral-200">DX Platform</span> that has
            teams shipping faster with higher quality.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button className="w-full gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-neutral-200 sm:w-auto">
              Text me
            </button>
            <button className="w-full rounded-full border border-neutral-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-900 sm:w-auto">
              Call me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeploymentHero;