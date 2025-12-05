import { useDraggable } from "@dnd-kit/core";
import Field from "./Field";
import type { ProtocolField } from "@/data";
import useGameStore from "@/store/useGameStore";

type DraggableFieldProps = {
  field: ProtocolField;
  isInserted?: boolean;
};

const DraggableField = ({ field, ...props }: DraggableFieldProps) => {
  const gameStatus = useGameStore((state) => state.gameStatus);
  const { setNodeRef, attributes, listeners, isDragging } = useDraggable({
    id: field.id,
    disabled: gameStatus !== "active",
  });

  return (
    <Field
      ref={setNodeRef}
      field={field}
      {...listeners}
      {...attributes}
      {...props}
      isDragging={isDragging}
      style={isDragging ? { opacity: 0 } : undefined}
    />
  );
};

export default DraggableField;
