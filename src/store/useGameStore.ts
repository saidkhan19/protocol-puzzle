import { create } from "zustand";
import { persist } from "zustand/middleware";

import { INFINITY_VALUE, type GameDuration } from "@/consts/durations";
import type { ProtocolFrame } from "@/data";

type GameStatus =
  | "idle" // not-started
  | "active" // playing
  | "won"
  | "lost"
  | "timeout";

type GameStoreState = {
  gameDuration: GameDuration;
  frameId: ProtocolFrame["frameId"] | null;
  gameStatus: GameStatus;
  gameStartTime: number | null;
  bestTime: Record<string, number>; // Map each frameId to its bestTime
};

type GameStoreActions = {
  setGameDuration: (duration: GameDuration) => void;
  setFrameId: (frameId: GameStoreState["frameId"]) => void;
  startGame: () => Promise<void>;
  stopGame: () => void;
};

type GameStore = GameStoreState & GameStoreActions;

const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      gameDuration: INFINITY_VALUE,
      frameId: null,
      gameStatus: "idle",
      gameStartTime: null,
      bestTime: {
        udp: 10,
      },
      setGameDuration: (duration) => set({ gameDuration: duration }),
      setFrameId: (frameId) => set({ frameId }),
      startGame: async () => {
        const state = get();
        if (!state.frameId) return;

        set({ gameStatus: "active", gameStartTime: Date.now() });

        if (typeof state.gameDuration === "number") {
          setTimeout(state.stopGame, state.gameDuration);
        }
      },
      stopGame: () => {
        set({ gameStatus: "idle", gameStartTime: null });
      },
    }),
    {
      name: "game",
    }
  )
);

export default useGameStore;
