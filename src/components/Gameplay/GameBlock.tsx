import { DndContext, type DragEndEvent } from "@dnd-kit/core";

import ProtocolStructure from "./ProtocolStructure";
import ProtocolFields from "./ProtocolFields";
import { useGameContext } from "./context";

const GameBlock = () => {
  const { insertField } = useGameContext();

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id) {
      insertField(event.active.id as string, event.over.id as string);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-10">
        <ProtocolStructure />
        <ProtocolFields />
      </div>
    </DndContext>
  );
};

export default GameBlock;
