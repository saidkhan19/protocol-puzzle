import type { SetPage } from "@/types/page";
import GoBackButton from "../shared/GoBackButton";
import useGameStore from "@/store/useGameStore";
import { getFrame } from "@/utils/data-transforms";

type GamePlayProps = {
  setPage: SetPage;
};

const Gameplay = ({ setPage }: GamePlayProps) => {
  const frameId = useGameStore((state) => state.frameId);
  if (!frameId) throw new Error("Frame was not selected");

  const frame = getFrame(frameId);

  return (
    <div>
      <div className="relative w-full flex justify-center">
        <GoBackButton onClick={() => setPage("menu")} />
        <h2 className="font-bold text-2xl sm:text-4xl">{frame.gameTitle}</h2>
      </div>
    </div>
  );
};

export default Gameplay;
