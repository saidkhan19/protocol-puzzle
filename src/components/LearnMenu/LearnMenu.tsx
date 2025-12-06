import { useState } from "react";

import type { ProtocolField, ProtocolFrame } from "@/data";
import type { SetPage } from "@/types/page";
import { useActiveFrame } from "@/store/selectors";
import { getProtocol } from "@/utils/data-transforms";
import GoBackButton from "../shared/GoBackButton";
import Fields from "./Fields";
import FrameOptions from "./FrameOptions";
import DescriptionBlock from "./DescriptionBlock";

type LearnMenuProps = {
  setPage: SetPage;
};

const LearnMenu = ({ setPage }: LearnMenuProps) => {
  const currentFrame = useActiveFrame();

  const protocol = getProtocol(currentFrame.protocolId);
  const [activeFrame, setActiveFrame] = useState<ProtocolFrame>(currentFrame);
  const [activeField, setActiveField] = useState<ProtocolField | null>(null);

  const handleChangeActiveFrame = (frame: ProtocolFrame) => {
    setActiveFrame(frame);
    setActiveField(null);
  };

  const handleChangeActiveField = (field: ProtocolField) => {
    setActiveField((prev) => {
      if (prev === field) return null;
      return field;
    });
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
        activeField={activeField}
        setActiveField={handleChangeActiveField}
      />
    </div>
  );
};

export default LearnMenu;
