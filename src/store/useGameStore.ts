import { create } from "zustand";
import { persist } from "zustand/middleware";

import { INFINITY_VALUE, type GameDuration } from "@/consts/durations";

type GameStoreState = {
  gameDuration: GameDuration;
  gameTitle: string | null;
};

type GameStoreActions = {
  setGameDuration: (duration: GameDuration) => void;
  startGame: (gameTitle: GameStoreState["gameTitle"]) => void;
};

type GameStore = GameStoreState & GameStoreActions;

const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      gameDuration: INFINITY_VALUE,
      gameTitle: null,
      setGameDuration: (duration) => set({ gameDuration: duration }),
      startGame: (gameTitle) => set({ gameTitle }),
    }),
    {
      name: "game",
    }
  )
);

export default useGameStore;
