import type { SetPage } from "@/types/page";
import GoBackButton from "../shared/GoBackButton";
import useGameStore from "@/store/useGameStore";
import Timer from "./Timer";
import InfiniteTimer from "./InfiniteTimer";
import GameBlock from "./GameBlock";
import { useActiveFrame } from "@/store/selectors";

type GamePlayProps = {
  setPage: SetPage;
};

const Gameplay = ({ setPage }: GamePlayProps) => {
  const frame = useActiveFrame();
  const duration = useGameStore((state) => state.gameDuration);
  const resetGame = useGameStore((state) => state.resetGame);

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

      <GameBlock />
    </div>
  );
};

export default Gameplay;
