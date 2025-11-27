import type { SetPage } from "@/types/page";
import { getFrame, getProtocol } from "@/utils/data-transforms";
import Protocols from "./Protocols";
import TimerSelect from "./TimerSelect";
import useGameStore from "@/store/useGameStore";

type GameMenuProps = {
  setPage: SetPage;
};

const GameMenu = ({ setPage }: GameMenuProps) => {
  const frameId = useGameStore((state) => state.frameId);
  const bestTime = useGameStore((state) =>
    frameId ? state.bestTime[frameId] : null
  );
  const startGame = useGameStore((state) => state.startGame);

  const frame = frameId ? getFrame(frameId) : null;
  const protocol = frame && getProtocol(frame.protocolId);

  const handleStartGame = () => {
    if (!frame) return;

    startGame(frame.frameId);
    setPage("game");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="min-h-62 sm:min-h-44 w-3/4 sm:w-2/3">
        {frame ? (
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-2xl sm:text-4xl text-center">
              {frame.gameTitle}
            </h2>
            <p className="mt-3 font-bold text-sm text-center">
              {protocol?.description}
            </p>
            <button
              className="mt-3 px-6 border-2 border-black shadow-hard-dark-2 font-bold text-sm cursor-pointer"
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
      <div className="py-4">
        <TimerSelect />
        {bestTime && (
          <p className="mt-3 font-work-sans text-center text-sm">
            Best: {bestTime}s
          </p>
        )}
      </div>
      <button
        data-active={Boolean(frame)}
        className={`h-12 px-12 border-3 shadow-hard-primary-2 text-blue-900
           font-work-sans font-semibold text-3xl rounded-3xl cursor-pointer
           data-[active=true]:bg-amber-500`}
        onClick={handleStartGame}
      >
        Play!
      </button>
      <p className="font-work-sans font-semibold text-sm">Select a protocol:</p>
      <Protocols />
    </div>
  );
};

export default GameMenu;
