import { type KeyboardEvent } from "react";

import { FRAMES, type ProtocolFrame } from "@/data";
import useGameStore from "@/store/useGameStore";

const colors: Record<ProtocolFrame["difficulty"], string> = {
  easy: "bg-green-400",
  medium: "bg-amber-500",
  hard: "bg-orange-600",
};

const Protocols = () => {
  const frameId = useGameStore((state) => state.frameId);
  const setFrameId = useGameStore((state) => state.setFrameId);

  const handleSetFrameId = (id: string) => {
    setFrameId(id === frameId ? null : id);
  };

  const handleKeyDown = (e: KeyboardEvent, frame: ProtocolFrame) => {
    if (e.key === "Enter" || e.key === " ") {
      handleSetFrameId(frame.frameId);
    }
  };

  return (
    <div className="flex flex-wrap">
      {FRAMES.map((frame) => (
        <div
          key={frame.frameTitle}
          className="w-1/2 md:w-1/4 p-2 select-none"
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, frame)}
        >
          <div
            data-frame-id={frame.frameId}
            className={`h-31 p-3.5 border-3 rounded-2xl border-blue-900 cursor-pointer flex flex-col gap-2 justify-between ${
              frameId === frame.frameId
                ? "shadow-hard-accent-4"
                : "shadow-hard-primary-4"
            }`}
            onClick={() => handleSetFrameId(frame.frameId)}
          >
            <div>
              <p className="font-bold text-base leading-none">
                {frame.gameTitle}
              </p>
              <p className="text-sm">
                {Object.keys(frame.fields).length} fields
              </p>
            </div>
            <p className="relative self-end uppercase font-semibold text-xs font-work-sans">
              <span className="relative z-10">{frame.difficulty}</span>
              <span
                className={`absolute z-0 left-1.5 top-1.5 -right-1.5 -bottom-0.5 ${
                  colors[frame.difficulty]
                }`}
              />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Protocols;
