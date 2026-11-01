import { lazy, Suspense, useEffect, useRef, useState } from "react";
import HeroSection from "@home/hero/HeroSection";

const ToolsSection = lazy(() => import("@home/tools/ToolsSection"));
const AiChat = lazy(() => import("@home/ai-chat/AiChat"));
const StatsSection = lazy(() => import("@home/Stats/StatsSection"));
const ProjectsSection = lazy(() => import("@home/projects/ProjectsSection"));
const SkillsSection = lazy(() => import("@home/skills/SkillsSection"));
const ContactMeSection = lazy(() => import("@home/contact/ContactMeSection"));
const BlogSection = lazy(() => import("@/components/templates/home/articles/ArticlesSection"),);

function SectionFallback({ minHeight = 360 }) {
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex w-full max-w-7xl items-center px-4 py-12"
      style={{ minHeight }}
    >
      <div className="w-full animate-pulse space-y-5">
        <div className="h-3 w-24 rounded-full bg-neutral-200/70 dark:bg-neutral-800/70" />
        <div className="h-8 w-2/5 rounded-xl bg-neutral-200/70 dark:bg-neutral-800/70" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div className="h-28 rounded-2xl bg-neutral-200/60 dark:bg-neutral-800/60" />
          <div className="h-28 rounded-2xl bg-neutral-200/60 dark:bg-neutral-800/60" />
          <div className="hidden h-28 rounded-2xl bg-neutral-200/60 dark:bg-neutral-800/60 md:block" />
        </div>
      </div>
    </div>
  );
}

function DeferredSection({ component: Component, minHeight }) {
  const sectionRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "500px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="w-full">
      {shouldLoad ? (
        <Suspense fallback={<SectionFallback minHeight={minHeight} />}>
          <Component />
        </Suspense>
      ) : (
        <SectionFallback minHeight={minHeight} />
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Keep the above-the-fold content in the initial bundle. */}
      <HeroSection />
      <DeferredSection component={AiChat} minHeight={420} />

      {/* Load below-the-fold sections only as they approach the viewport. */}
      <DeferredSection component={ToolsSection} minHeight={420} />
      <DeferredSection component={StatsSection} minHeight={360} />
      <DeferredSection component={ProjectsSection} minHeight={520} />
      <DeferredSection component={SkillsSection} minHeight={420} />
      <DeferredSection component={ContactMeSection} minHeight={520} />
      <DeferredSection component={BlogSection} minHeight={420} />
    </>
  );
}
