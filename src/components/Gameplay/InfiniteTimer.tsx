import { useEffect, useState } from "react";

type InfiniteTimerProps = {
  startTime: number;
};

const getElapsedTimeInSeconds = (startTime: number) => {
  return Math.round((Date.now() - startTime) / 1000);
};

const InfiniteTimer = ({ startTime }: InfiniteTimerProps) => {
  const [counter, setCounter] = useState<number>(
    getElapsedTimeInSeconds(startTime)
  );

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setCounter(getElapsedTimeInSeconds(startTime));
    }, 1000);

    return () => clearInterval(timeoutId);
  }, [startTime]);

  return (
    <div className="w-1/4 sm:w-1/7 h-7 relative border-2 border-black shadow-hard-dark-2 text-center">
      <div className="absolute top-0 left-0 right-0 bottom-1 bg-emerald-200" />
      <span className="relative font-bold text-xl">{counter}s</span>
    </div>
  );
};

export default InfiniteTimer;
