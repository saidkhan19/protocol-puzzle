import { create } from "zustand";
import { persist } from "zustand/middleware";

import { INFINITY_VALUE, type GameDuration } from "@/consts/durations";
import type { ProtocolFrame } from "@/data";

type GameStoreState = {
  gameDuration: GameDuration;
  frameId: ProtocolFrame["frameId"] | null;
  isPlaying: boolean;
  bestTime: Record<string, number>; // Map each frameId to its bestTime
};

type GameStoreActions = {
  setGameDuration: (duration: GameDuration) => void;
  setFrameId: (frameId: GameStoreState["frameId"]) => void;
  startGame: () => void;
  stopGame: () => void;
};

type GameStore = GameStoreState & GameStoreActions;

const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      gameDuration: INFINITY_VALUE,
      frameId: null,
      isPlaying: false,
      bestTime: {
        udp: 10,
      },
      setGameDuration: (duration) => set({ gameDuration: duration }),
      setFrameId: (frameId) => set({ frameId }),
      startGame: () => {
        if (get().frameId) set({ isPlaying: true });
      },
      stopGame: () => set({ isPlaying: false }),
    }),
    {
      name: "game",
    }
  )
);

export default useGameStore;
