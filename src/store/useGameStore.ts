import { create } from "zustand";
import { persist } from "zustand/middleware";

import { INFINITY_VALUE } from "@/consts/durations";
import type { GameStore } from "./types";
import { getElapsedTimeInSeconds } from "@/utils/game";

const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      gameDuration: INFINITY_VALUE,
      frameId: null,
      gameStatus: "idle",
      gameStartTime: null,
      timeoutId: undefined,
      bestTime: {},
      setGameDuration: (duration) => set({ gameDuration: duration }),
      setFrameId: (frameId) => set({ frameId }),
      startGame: async () => {
        const state = get();
        if (!state.frameId || state.gameStatus === "active") return;

        // Initialize state and schedule a timer
        let timeoutId: GameStore["timeoutId"];

        if (typeof state.gameDuration === "number") {
          timeoutId = setTimeout(
            () => state.stopGame("timeout"),
            state.gameDuration
          );
        }

        set({ gameStatus: "active", gameStartTime: Date.now(), timeoutId });
      },
      stopGame: (status) => {
        const state = get();

        // Only stop if game is active
        if (state.gameStatus !== "active") return;

        // Clear the timeout
        clearTimeout(state.timeoutId);

        // Calculate best time
        const bestTime: GameStore["bestTime"] = { ...state.bestTime };
        if (status === "won") {
          const time = getElapsedTimeInSeconds(state.gameStartTime!);
          const prevTime = bestTime[state.frameId!] ?? Infinity;

          bestTime[state.frameId!] = time < prevTime ? time : prevTime;
        }

        set({ gameStatus: status, bestTime });
      },
      resetGame: () => {
        // Clear the timeout
        clearTimeout(get().timeoutId);

        set({
          gameStatus: "idle",
          gameStartTime: null,
        });
      },
    }),
    {
      name: "game",
      partialize: (state) => ({
        frameId: state.frameId,
        bestTime: state.bestTime,
        gameDuration: state.gameDuration,
      }),
    }
  )
);

export default useGameStore;
