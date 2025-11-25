import type { ProtocolFrame } from "@/data";
import type { SetPage } from "@/types/page";
import { getProtocol } from "@/utils/data-transforms";
import ArrowLeft from "@/assets/icons/arrow-left.svg?react";

type LearnMenuProps = {
  selectedFrame: ProtocolFrame | null;
  setPage: SetPage;
};

const LearnMenu = ({ selectedFrame, setPage }: LearnMenuProps) => {
  if (!selectedFrame) throw new Error("Frame was not selected");

  const protocol = getProtocol(selectedFrame.protocolId);

  return (
    <div>
      <button onClick={() => setPage("menu")}>
        <ArrowLeft />
      </button>
      <h2>{protocol.title}</h2>
      <p>{protocol.secondTitle}</p>
    </div>
  );
};

export default LearnMenu;
