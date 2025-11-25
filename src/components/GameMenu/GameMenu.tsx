import type { Dispatch, SetStateAction } from "react";

import type { SetPage } from "@/types/page";
import { type ProtocolFrame } from "@/data";
import Protocols from "./Protocols";
import { getProtocol } from "@/utils/data-transforms";

type GameMenuProps = {
  selectedFrame: ProtocolFrame | null;
  setSelectedFrame: Dispatch<SetStateAction<ProtocolFrame | null>>;
  setPage: SetPage;
};

const GameMenu = ({
  selectedFrame,
  setSelectedFrame,
  setPage,
}: GameMenuProps) => {
  const protocol = selectedFrame && getProtocol(selectedFrame.protocolId);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="min-h-62 sm:min-h-44 w-3/4 sm:w-2/3">
        {selectedFrame ? (
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-2xl sm:text-4xl text-center">
              {selectedFrame.gameTitle}
            </h2>
            <p className="mt-3 font-bold text-sm text-center">
              {protocol?.description}
            </p>
            <button
              className="mt-3 px-6 border-2 border-black shadow-hard-dark font-bold text-sm cursor-pointer"
              onClick={() => setPage("learn")}
            >
              Learn
            </button>
          </div>
        ) : (
          <p className="font-bold text-base text-center">
            Learn network protocols by organizing their structure. Drag fields
            into place to build valid HTTP requests, TCP segments, IPv4/IPv6
            packets, and more.
          </p>
        )}
      </div>
      <Protocols selected={selectedFrame} onSelect={setSelectedFrame} />
    </div>
  );
};

export default GameMenu;
