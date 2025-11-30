import { useEffect, useState } from "react";

import useGameStore from "@/store/useGameStore";
import { getElapsedTimeInSeconds } from "@/utils/game";

const InfiniteTimer = () => {
  const startTime = useGameStore((state) => state.gameStartTime);
  if (!startTime) throw new Error("Game did not start");

  const gameStatus = useGameStore((state) => state.gameStatus);

  const [timer, setTimer] = useState<number>(
    getElapsedTimeInSeconds(startTime)
  );

  useEffect(() => {
    if (gameStatus === "active") {
      const timeoutId = setInterval(() => {
        setTimer(getElapsedTimeInSeconds(startTime));
      }, 1000);

      return () => clearInterval(timeoutId);
    }
  }, [startTime, gameStatus]);

  return (
    <div className="w-1/4 sm:w-1/7 h-7 relative border-2 border-black shadow-hard-dark-2 text-center">
      <div className="absolute top-0 left-0 right-0 bottom-1 bg-emerald-200" />
      <span className="relative font-bold text-xl">{timer}s</span>
    </div>
  );
};

export default InfiniteTimer;
