import { useEffect, useState } from "react";
import { useMotionValue, animate } from "framer-motion";

const CountUp = ({ value, duration = 1.4, delay = 0 }) => {
  const [display, setDisplay] = useState("00");
  const motionVal = useMotionValue(0);

  useEffect(() => {
    const controls = animate(motionVal, value, {
      duration,
      delay,
      ease: "easeOut",
    });

    const unsubscribe = motionVal.on("change", (latest) => {
      setDisplay(String(Math.round(latest)).padStart(2, "0"));
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <p className="font-semibold text-3xl tabular-nums">{display}</p>;
};

export default CountUp;