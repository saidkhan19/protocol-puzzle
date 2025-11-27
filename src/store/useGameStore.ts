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
  setFrameId: (frameId: string) => void;
  startGame: (frameId: GameStoreState["frameId"]) => void;
};

type GameStore = GameStoreState & GameStoreActions;

const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      gameDuration: INFINITY_VALUE,
      frameId: null,
      isPlaying: false,
      bestTime: {
        udp: 10,
      },
      setGameDuration: (duration) => set({ gameDuration: duration }),
      setFrameId: (frameId) => set({ frameId }),
      startGame: (frameId) => set({ frameId, isPlaying: true }),
    }),
    {
      name: "game",
    }
  )
);

export default useGameStore;
