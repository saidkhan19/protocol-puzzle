import { create } from "zustand";
import { persist } from "zustand/middleware";

import { INFINITY_VALUE } from "@/consts/durations";
import type { GameStatus, GameStore } from "./types";
import { getElapsedTimeInSeconds } from "@/utils/game";
import { assertFrameId, assertGameStartTime, assertInsertions } from "./assert";
import { getFrame } from "@/utils/data-transforms";
import BiMap from "@/lib/BiMap";

const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      gameDuration: INFINITY_VALUE,
      frameId: null,
      gameStatus: "idle",
      gameStartTime: null,
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
            () => state.stopGame(true),
            state.gameDuration
          );
        }

        set({
          gameStatus: "active",
          gameStartTime: Date.now(),
          timeoutId,
          insertions: new BiMap(),
        });
      },
      stopGame: (timeout = false) => {
        const state = get();
        // Only stop if game is active
        if (state.gameStatus !== "active") return;
        // Clear the timeout
        clearTimeout(state.timeoutId);

        // Calculate game results
        const { frameId, insertions, gameStartTime } = state;
        assertFrameId(frameId);
        assertInsertions(insertions);
        assertGameStartTime(gameStartTime);

        const frame = getFrame(frameId);
        const hasWon = frame.fields.every((f) => insertions.get(f.id) === f.id);

        const status: GameStatus = hasWon
          ? "won"
          : timeout
          ? "timeout"
          : "lost";

        // Calculate best time
        const bestTime: GameStore["bestTime"] = { ...state.bestTime };
        if (status === "won") {
          const time = getElapsedTimeInSeconds(gameStartTime);
          const prevTime = bestTime[frameId] ?? Infinity;

          bestTime[frameId] = time < prevTime ? time : prevTime;
        }

        set({ gameStatus: status, bestTime });
      },
      resetGame: () => {
        // Clear the timeout
        clearTimeout(get().timeoutId);

        set({
          gameStatus: "idle",
          gameStartTime: null,
          insertions: undefined,
        });
      },
      insertField: (fieldId, positionId) => {
        set((state) => {
          assertInsertions(state.insertions);

          const next = new BiMap(state.insertions);

          // if this field was already inserted and position has a field, then swap them
          if (next.hasKey(fieldId) && next.hasValue(positionId)) {
            const swapPosition = next.get(fieldId)!;
            const swapField = next.getKey(positionId)!;
            next.set(swapField, swapPosition);
          }

          next.set(fieldId, positionId);

          return { insertions: next };
        });
      },
      getField: (positionId: string) => {
        const { frameId, insertions } = get();

        assertFrameId(frameId);
        assertInsertions(insertions);

        const fieldId = insertions.getKey(positionId);
        if (!fieldId) return null;

        const frame = getFrame(frameId);
        return frame.fields.find((f) => f.id === fieldId)!;
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
