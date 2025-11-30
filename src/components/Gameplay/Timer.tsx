import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";

import useGameStore from "@/store/useGameStore";
import { getRemainingTimeInSeconds } from "@/utils/game";

const getProgress = (startTime: number, duration: number) => {
  return (Date.now() - startTime) / duration;
};

const Timer = () => {
  const startTime = useGameStore((state) => state.gameStartTime);
  if (!startTime) throw new Error("Game did not start");

  const duration = useGameStore((state) => state.gameDuration);
  if (typeof duration !== "number") throw new Error("Invalid timer duration");

  const gameStatus = useGameStore((state) => state.gameStatus);

  const [timer, setTimer] = useState<number>(
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
      onComplete: () => setTimer(0),
    });
  }, [x, startTime, duration]);

  useEffect(() => {
    if (gameStatus === "active") {
      const timeoutId = setInterval(() => {
        setTimer(getRemainingTimeInSeconds(startTime, duration));
      }, 1000);

      return () => clearInterval(timeoutId);
    }
  }, [startTime, duration, gameStatus]);

  return (
    <div className="w-1/2 sm:w-2/5 h-7 relative border-2 border-black shadow-hard-dark-2 text-end">
      <motion.div
        className="absolute top-0 bottom-1"
        style={{ width, backgroundColor }}
        transition={{ backgroundColor: { duration: 0.1 } }}
      />
      <span className="relative pr-1 font-bold text-xl">{timer}s</span>
    </div>
  );
};

export default Timer;
