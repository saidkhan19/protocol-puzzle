import { useState, type ReactNode } from "react";

import { GameContext, type GameContextValue } from "./context";
import useGameStore from "@/store/useGameStore";
import { getFrame } from "@/utils/data-transforms";
import BiMap from "@/lib/BiMap";

type GameProviderProps = {
  children: ReactNode;
};

const GameProvider = ({ children }: GameProviderProps) => {
  const frameId = useGameStore((state) => state.frameId);
  if (!frameId) throw new Error("Frame was not selected");

  const frame = getFrame(frameId);

  // Keep placeholderId to fieldId pair in a bimap
  const [positions, setPositions] = useState<BiMap<string, string>>(
    () => new BiMap()
  );

  const value: GameContextValue = {
    frame,
    isInserted: (fieldId) => positions.hasValue(fieldId),
    getFieldAt: (positionId) => {
      const fieldId = positions.get(positionId);
      if (!fieldId) return null;
      return frame.fields.find((f) => f.id === fieldId)!;
    },
    insertField: (fieldId, positionId) => {
      setPositions((prev) => {
        const next = new BiMap(prev);
        next.set(positionId, fieldId);
        return next;
      });
    },
    swapFields: (fieldId1, fieldId2) => {
      setPositions((prev) => {
        const next = new BiMap(prev);
        const pos1 = next.getKey(fieldId1);
        const pos2 = next.getKey(fieldId2);

        if (!pos1 || !pos2) return prev;

        next.set(pos2, fieldId1);
        next.set(pos1, fieldId2);
        return next;
      });
    },
    getUninsertedFields: () =>
      frame.fields.filter((f) => !positions.hasValue(f.id)),
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
