import type { ProtocolFrame } from "@/data";
import { getRelatedFrames } from "@/utils/data-transforms";

type FrameOptionsProps = {
  protocolId: string;
  activeFrame: ProtocolFrame;
  setActiveFrame: (frame: ProtocolFrame) => void;
};

const FrameOptions = ({
  protocolId,
  activeFrame,
  setActiveFrame,
}: FrameOptionsProps) => {
  const relatedFrames = getRelatedFrames(protocolId);

  if (relatedFrames.length <= 1) return null;

  return (
    <div className="mt-8 flex gap-5 flex-wrap justify-center">
      {relatedFrames.map((frame) => (
        <button
          key={frame.frameTitle}
          className={`px-4 py-1 font-bold text-sm border-2 border-blue-900 shadow-hard-sm rounded-2xl cursor-pointer tracking-widest ${
            frame === activeFrame ? "bg-amber-500" : ""
          }`}
          onClick={() => setActiveFrame(frame)}
        >
          {frame.frameTitle}
        </button>
      ))}
    </div>
  );
};

export default FrameOptions;
