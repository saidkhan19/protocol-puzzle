import { type GameDuration } from "@/consts/durations";
import type { ProtocolField, ProtocolFrame } from "@/data";
import type BiMap from "@/lib/BiMap";

export type GameStatus =
  | "idle" // not-started
  | "active" // playing
  | "won"
  | "lost"
  | "timeout";

export type GameStoreState = {
  gameDuration: GameDuration;
  frameId: ProtocolFrame["frameId"] | null;
  gameStatus: GameStatus;
  gameStartTime: number | null;
  bestTime: Record<string, number>; // Map each frameId to its bestTime
  timeoutId?: ReturnType<typeof setTimeout>;
  insertions?: BiMap<string, string>; // Map fieldId to positionId
  insertField: (fieldId: string, positionId: string) => void;
  getField: (positionId: string) => ProtocolField | null;
};

export type GameStoreActions = {
  setGameDuration: (duration: GameDuration) => void;
  setFrameId: (frameId: GameStoreState["frameId"]) => void;
  startGame: () => Promise<void>;
  stopGame: (timeout?: boolean) => void;
  resetGame: () => void;
};

export type GameStore = GameStoreState & GameStoreActions;
