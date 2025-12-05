import { getFrame } from "@/utils/data-transforms";
import { assertFrameId, assertInsertions } from "./assert";
import useGameStore from "./useGameStore";

export const useActiveFrame = () => {
  return useGameStore((state) => {
    assertFrameId(state.frameId);
    return getFrame(state.frameId);
  });
};

export const useIsInsertedCorrectly = (fieldId: string) => {
  return useGameStore((state) => {
    assertInsertions(state.insertions);

    // True if fieldId matches positionId
    return state.insertions.get(fieldId) === fieldId;
  });
};

export const useUninsertedFields = () => {
  const frameId = useGameStore((state) => state.frameId);
  const insertions = useGameStore((state) => state.insertions);

  assertFrameId(frameId);
  assertInsertions(insertions);

  const frame = getFrame(frameId);
  return frame.fields.filter((f) => !insertions.hasKey(f.id));
};
