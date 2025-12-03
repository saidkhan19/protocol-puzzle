import { createContext, useContext } from "react";

import type { ProtocolField, ProtocolFrame } from "@/data";

export type GameContextValue = {
  frame: ProtocolFrame;
  isInserted: (fieldId: string) => boolean;
  getFieldAt: (positionId: string) => ProtocolField | null;
  insertField: (fieldId: string, positionId: string) => void;
  getUninsertedFields: () => ProtocolField[];
};

export const GameContext = createContext<GameContextValue | null>(null);

export const useGameContext = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGameContext must be inside Provider");
  return ctx;
};
