const TECHS = [
  "HTML",
  "CSS",
  "Tailwind CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Redux",
  "Git & Github",
  "WebSocket",
];

const TechItem = ({ name }) => (
  <div className="tech-item flex shrink-0 cursor-pointer items-center rounded-full bg-neutral-100 px-5 py-2.5 transition-all duration-300 ease-out dark:bg-neutral-800/80">
    <span className="tech-item-label whitespace-nowrap text-sm font-medium text-neutral-500 transition-all duration-300 dark:text-neutral-400 md:text-base">
      {name}
    </span>
  </div>
);

const TechSet = ({ hidden = false }) => (
  <div
    aria-hidden={hidden}
    className="flex shrink-0 items-center gap-4 sm:gap-6 md:gap-8"
  >
    {TECHS.map((name) => (
      <TechItem key={name} name={name} />
    ))}
  </div>
);

const TechMarquee = () => (
  <div
    className="relative -mx-4 w-full overflow-hidden"
    style={{
      WebkitMaskImage:
        "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      maskImage:
        "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
    }}
  >
    <div className="marquee-track flex w-max shrink-0 items-center gap-4 sm:gap-6 md:gap-8">
      <TechSet />
      <TechSet hidden />
    </div>

    <style>{`
      .marquee-track {
        animation: tech-marquee 50s linear infinite;
        will-change: transform;
      }

      .marquee-track:hover {
        animation-play-state: paused;
      }

      .tech-item:hover {
        background-color: rgb(23 23 23 / 0.05);
      }

      :is(.dark) .tech-item:hover {
        background-color: rgb(255 255 255 / 0.06);
      }

      .tech-item:hover .tech-item-label {
        opacity: 1;
        color: #171717;
      }

      :is(.dark) .tech-item:hover .tech-item-label {
        color: #ffffff;
      }

      @keyframes tech-marquee {
        from {
          transform: translate3d(0, 0, 0);
        }

        to {
          transform: translate3d(-50%, 0, 0);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .marquee-track {
          animation: none;
        }
      }
    `}</style>
  </div>
);

export default TechMarquee;