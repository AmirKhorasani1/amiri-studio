import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import { router } from "../../router";

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      // lerp (not duration) drives the easing here. duration-based easing
      // recalculates a fixed-time tween on every wheel event, so a fast or
      // sudden scroll restarts that tween mid-flight and the eased position
      // visibly snaps/jumps. lerp interpolates continuously toward the
      // target instead, so rapid successive scroll events blend smoothly.
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      infinite: false,
    });

    lenisRef.current = lenis;
    document.documentElement.classList.add("lenis");

    let animationFrameId;

    const raf = (time) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);

    // Lenis caches the scrollable content height on init and doesn't
    // auto-detect later DOM changes (images/fonts loading, lazy sections,
    // route content swapping in). If real page height grows or shrinks
    // after that, Lenis's cached scroll limit goes stale - scrolling fast
    // toward what it thinks is the boundary then snaps/jumps to correct
    // itself. Re-measuring on any size change keeps that limit accurate.
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    const handleWindowResize = () => lenis.resize();
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("load", handleWindowResize);

    // `router` here is the object created by createBrowserRouter in
    // ./router.js, not JSX context - so this works even though
    // SmoothScroll renders outside <RouterProvider>. subscribe() fires
    // on every navigation with the new router state, which is what we
    // use instead of useLocation() (that hook needs to run inside the
    // Router's own React tree, which this component isn't part of).
    const unsubscribe = router.subscribe((state) => {
      lenis.scrollTo(0, { immediate: true });
      lenis.resize();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("load", handleWindowResize);
      unsubscribe();
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  return children;
};

export default SmoothScroll;