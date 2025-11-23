import { create } from "zustand";
import { persist } from "zustand/middleware";

type GameStoreState = {
  protocolId: string | null;
  gameTitle: string | null;
};

type GameStoreActions = {
  startGame: (
    protocolId: GameStoreState["protocolId"],
    gameTitle: GameStoreState["gameTitle"]
  ) => void;
};

type GameStore = GameStoreState & GameStoreActions;

const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      protocolId: null,
      gameTitle: null,
      startGame: (protocolId, gameTitle) => set({ protocolId, gameTitle }),
    }),
    {
      name: "game",
    }
  )
);

export default useGameStore;
