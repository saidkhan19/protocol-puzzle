import { type GameDuration } from "@/consts/durations";
import type { ProtocolFrame } from "@/data";

export type OngoingGameStatus =
  | "idle" // not-started
  | "active"; // playing

export type FinishedGameStatus = "won" | "lost" | "timeout";

export type GameStatus = OngoingGameStatus | FinishedGameStatus;

export type GameStoreState = {
  gameDuration: GameDuration;
  frameId: ProtocolFrame["frameId"] | null;
  gameStatus: GameStatus;
  gameStartTime: number | null;
  timeoutId: ReturnType<typeof setTimeout> | undefined;
  bestTime: Record<string, number>; // Map each frameId to its bestTime
};

export type GameStoreActions = {
  setGameDuration: (duration: GameDuration) => void;
  setFrameId: (frameId: GameStoreState["frameId"]) => void;
  startGame: () => Promise<void>;
  stopGame: (status: FinishedGameStatus) => void;
  resetGame: () => void;
};

export type GameStore = GameStoreState & GameStoreActions;
