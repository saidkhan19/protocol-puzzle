import type { ReactNode } from "react";
import { motion } from "motion/react";

import HourglassIcon from "@/assets/icons/hourglass.svg?react";
import InfinityIcon from "@/assets/icons/infinity.svg?react";
import { DURATIONS, INFINITY_VALUE } from "@/consts/durations";
import useGameStore from "@/store/useGameStore";

type TimerOptionProps = {
  selected: boolean;
  onSelect: () => void;
  children: ReactNode;
};

const TimerOption = ({ selected, onSelect, children }: TimerOptionProps) => {
  return (
    <button
      className="relative h-9 aspect-square flex items-center justify-center cursor-pointer transition-colors hover:bg-slate-200 rounded-md"
      onClick={onSelect}
    >
      {selected && (
        <motion.div
          layoutId="option"
          className="absolute inset-0 bg-amber-500 rounded-md shadow-hard-primary-3 z-0"
        />
      )}
      <div className="relative z-10">{children}</div>
    </button>
  );
};

const TimerSelect = () => {
  const currentDuration = useGameStore((state) => state.gameDuration);
  const setGameDuration = useGameStore((state) => state.setGameDuration);

  return (
    <div className="px-5 py-1 border-3 border-blue-900 rounded-3xl shadow-hard-primary-2 flex gap-4 items-center">
      <HourglassIcon />
      <div className="flex gap-2">
        {DURATIONS.map((d) => (
          <TimerOption
            key={d.name}
            selected={currentDuration === d.value}
            onSelect={() => setGameDuration(d.value)}
          >
            <span className="font-bold font-work-sans text-blue-900 text-base">
              {d.name}
            </span>
          </TimerOption>
        ))}
        <TimerOption
          selected={currentDuration === INFINITY_VALUE}
          onSelect={() => setGameDuration(INFINITY_VALUE)}
        >
          <InfinityIcon />
        </TimerOption>
      </div>
    </div>
  );
};

export default TimerSelect;
