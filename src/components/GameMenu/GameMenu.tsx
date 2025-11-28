import { useRef } from "react";

import type { SetPage } from "@/types/page";
import Protocols from "./Protocols";
import TimerSelect from "./TimerSelect";
import useGameStore from "@/store/useGameStore";
import Header from "./Header";
import SelectText, { type SelectTextHandle } from "./SelectText";

type GameMenuProps = {
  setPage: SetPage;
};

const GameMenu = ({ setPage }: GameMenuProps) => {
  const selectTextRef = useRef<SelectTextHandle>(null);
  const frameId = useGameStore((state) => state.frameId);
  const bestTime = useGameStore((state) =>
    frameId ? state.bestTime[frameId] : null
  );
  const startGame = useGameStore((state) => state.startGame);

  const handleStartGame = () => {
    if (!frameId) {
      selectTextRef.current?.triggerAnimation();
      return;
    }

    startGame();
    setPage("game");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Header setPage={setPage} />
      <div className="min-h-21 mt-3">
        <TimerSelect />
        {bestTime && (
          <p className="mt-3 font-work-sans text-center text-sm">
            Best: {bestTime}s
          </p>
        )}
      </div>
      <button
        data-active={Boolean(frameId)}
        className={`h-12 px-12 border-3 shadow-hard-primary-2 text-blue-900
           font-work-sans font-semibold text-3xl rounded-3xl
           data-[active=true]:bg-amber-500 data-[active=true]:cursor-pointer`}
        onClick={handleStartGame}
      >
        Play!
      </button>
      <SelectText key={frameId} ref={selectTextRef} />
      <Protocols />
    </div>
  );
};

export default GameMenu;
