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
import { useGameContext } from "./context";
import ProtocolStructure from "./ProtocolStructure";
import ProtocolFields from "./ProtocolFields";
import Field from "./Field";

const GameBlock = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { frame, insertField, swapFields, getFieldAt, isInserted } =
    useGameContext();

  const activeField = activeId && getField(frame, activeId);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id) {
      const fieldId = event.active.id as string;
      const positionId = event.over.id as string;

      // if this position has a field inserted and field being dragged was also inserted, swap them
      const insertedField = getFieldAt(positionId);
      if (isInserted(fieldId) && insertedField) {
        swapFields(fieldId, insertedField.id);
      } else {
        insertField(fieldId, positionId);
      }
    }
  };

  return (
    <DndContext
      modifiers={[restrictToWindowEdges, centerOnCursor]}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col gap-10">
        <ProtocolStructure />
        <ProtocolFields />
      </div>
      <DragOverlay dropAnimation={null}>
        {activeField ? <Field field={activeField} isDragging={true} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default GameBlock;
