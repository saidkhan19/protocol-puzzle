import type { SetPage } from "@/types/page";
import GoBackButton from "../shared/GoBackButton";
import useGameStore from "@/store/useGameStore";
import { getFrame } from "@/utils/data-transforms";
import Timer from "./Timer";
import InfiniteTimer from "./InfiniteTimer";
import GameBlock from "./GameBlock";
import GameProvider from "./GameProvider";

type GamePlayProps = {
  setPage: SetPage;
};

const Gameplay = ({ setPage }: GamePlayProps) => {
  const frameId = useGameStore((state) => state.frameId);
  if (!frameId) throw new Error("Frame was not selected");

  const duration = useGameStore((state) => state.gameDuration);
  const resetGame = useGameStore((state) => state.resetGame);

  const frame = getFrame(frameId);

  const handleGoBack = () => {
    resetGame();
    setPage("menu");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full flex justify-center">
        <GoBackButton onClick={handleGoBack} />
        <h2 className="font-bold text-2xl sm:text-4xl">{frame.gameTitle}</h2>
      </div>
      <div className="py-6 flex justify-center">
        {typeof duration === "number" ? <Timer /> : <InfiniteTimer />}
      </div>
      <GameProvider>
        <GameBlock />
      </GameProvider>
    </div>
  );
};

export default Gameplay;
