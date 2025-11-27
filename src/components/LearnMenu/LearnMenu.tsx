import { useState } from "react";

import type { ProtocolField, ProtocolFrame } from "@/data";
import type { SetPage } from "@/types/page";
import { getFrame, getProtocol } from "@/utils/data-transforms";
import GoBackButton from "../shared/GoBackButton";
import Fields from "./Fields";
import FrameOptions from "./FrameOptions";
import DescriptionBlock from "./DescriptionBlock";
import useGameStore from "@/store/useGameStore";

type LearnMenuProps = {
  setPage: SetPage;
};

const LearnMenu = ({ setPage }: LearnMenuProps) => {
  const frameId = useGameStore((state) => state.frameId);
  if (!frameId) throw new Error("Frame was not selected");

  const currentFrame = getFrame(frameId);
  const protocol = getProtocol(currentFrame.protocolId);

  const [activeFrame, setActiveFrame] = useState<ProtocolFrame>(currentFrame);
  const [activeField, setActiveField] = useState<ProtocolField | null>(null);

  const handleChangeActiveFrame = (frame: ProtocolFrame) => {
    setActiveFrame(frame);
    setActiveField(null);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full flex justify-center">
        <GoBackButton onClick={() => setPage("menu")} />
        <h2 className="font-bold text-2xl sm:text-4xl">{protocol.title}</h2>
      </div>
      <p className="w-3/4 sm:w-2/3 mt-3 font-medium text-xl text-center">
        {protocol.secondTitle}
      </p>
      <DescriptionBlock protocol={protocol} field={activeField} />
      <FrameOptions
        protocolId={protocol.id}
        activeFrame={activeFrame}
        setActiveFrame={handleChangeActiveFrame}
      />
      <Fields
        frame={activeFrame}
        activeField={activeField}
        setActiveField={setActiveField}
      />
    </div>
  );
};

export default LearnMenu;
