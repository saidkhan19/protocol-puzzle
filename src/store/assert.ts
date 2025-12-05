import type { GameStoreState } from "./types";

export function assertFrameId(
  frameId: GameStoreState["frameId"]
): asserts frameId is NonNullable<GameStoreState["frameId"]> {
  if (!frameId) throw new Error("Frame id is not initializeds");
}

export function assertInsertions(
  insertions: GameStoreState["insertions"]
): asserts insertions is NonNullable<GameStoreState["insertions"]> {
  if (!insertions) throw new Error("Insertions is not initialized");
}

export function assertGameStartTime(
  gameStartTime: GameStoreState["gameStartTime"]
): asserts gameStartTime is NonNullable<GameStoreState["gameStartTime"]> {
  if (!gameStartTime) throw new Error("Game start time is not initialized");
}
