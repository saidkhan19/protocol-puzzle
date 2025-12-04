import { useDraggable } from "@dnd-kit/core";
import Field from "./Field";
import type { ProtocolField } from "@/data";

type DraggableFieldProps = {
  field: ProtocolField;
  isInserted?: boolean;
};

const DraggableField = ({ field, ...props }: DraggableFieldProps) => {
  const { setNodeRef, attributes, listeners, isDragging } = useDraggable({
    id: field.id,
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
