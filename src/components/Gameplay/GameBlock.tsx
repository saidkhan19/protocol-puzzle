import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  pointerWithin,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import { centerOnCursor } from "@/utils/dnd";
import { getField } from "@/utils/data-transforms";
import ProtocolStructure from "./ProtocolStructure";
import ProtocolFields from "./ProtocolFields";
import Field from "./Field";
import useGameStore from "@/store/useGameStore";
import { useActiveFrame } from "@/store/selectors";

const GameBlock = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const frame = useActiveFrame();
  const gameStatus = useGameStore((state) => state.gameStatus);
  const insertField = useGameStore((state) => state.insertField);

  const activeField = activeId && getField(frame, activeId);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id) {
      const fieldId = event.active.id as string;
      const positionId = event.over.id as string;

      insertField(fieldId, positionId);
    }
  };

  return (
    <DndContext
      cancelDrop={() => gameStatus !== "active"}
      modifiers={[restrictToWindowEdges, centerOnCursor]}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col gap-10">
        <ProtocolStructure />

        <div className="min-h-60">
          <ProtocolFields />
        </div>
      </div>
      <DragOverlay dropAnimation={null}>
        {activeField ? <Field field={activeField} isDragging={true} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default GameBlock;
