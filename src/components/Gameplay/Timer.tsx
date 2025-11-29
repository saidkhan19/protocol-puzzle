import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useState } from "react";

type TimerProps = {
  startTime: number;
  duration: number;
};

const getProgress = (startTime: number, duration: number) => {
  return (Date.now() - startTime) / duration;
};

const getRemainingTimeInSeconds = (startTime: number, duration: number) => {
  const t = Math.round((duration - Date.now() + startTime) / 1000);
  return t > 0 ? t : 0;
};

const Timer = ({ startTime, duration }: TimerProps) => {
  const [counter, setCounter] = useState<number>(
    getRemainingTimeInSeconds(startTime, duration)
  );
  const x = useMotionValue(getProgress(startTime, duration));
  const width = useTransform(x, [0, 1], ["100%", "0%"]);
  const backgroundColor = useTransform(
    x,
    [0.3, 0.7, 1],
    [
      "var(--color-green-400)",
      "var(--color-amber-500)",
      "var(--color-orange-600)",
    ]
  );

  useEffect(() => {
    animate(x, 1, {
      duration: (startTime + duration - Date.now()) / 1000,
      ease: "linear",
    });
  }, [x, startTime, duration]);

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setCounter(getRemainingTimeInSeconds(startTime, duration));
    }, 1000);

    return () => clearInterval(timeoutId);
  }, [startTime, duration]);

  return (
    <div className="w-1/2 sm:w-2/5 h-7 relative border-2 border-black shadow-hard-dark-2 text-end">
      <motion.div
        className="absolute top-0 bottom-1"
        style={{ width, backgroundColor }}
        transition={{ backgroundColor: { duration: 0.1 } }}
      />
      <span className="relative pr-1 font-bold text-xl">{counter}s</span>
    </div>
  );
};

export default Timer;
