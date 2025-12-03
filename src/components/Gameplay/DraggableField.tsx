import { motion } from "motion/react";
import { useDraggable } from "@dnd-kit/core";

import type { ProtocolField } from "@/data";
import { useGameContext } from "./context";

type DraggableFieldProps = {
  field: ProtocolField;
};

const DraggableField = ({ field }: DraggableFieldProps) => {
  const { isInserted } = useGameContext();
  const { setNodeRef, attributes, listeners, transform, isDragging } =
    useDraggable({
      id: field.id,
    });

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      data-dragging={isDragging}
      data-inserted={isInserted(field.id) && !isDragging}
      className={`px-6 py-2 border-3 border-blue-900 rounded-3xl bg-sky-50 shadow-hard-primary-2 cursor-grab z-50
        select-none text-center data-[inserted="true"]:w-full `}
      style={{ x: transform?.x ?? 0, y: transform?.y ?? 0 }}
    >
      <span className="font-bold text-sm tracking-widest">{field.name}</span>
    </motion.div>
  );
};

export default DraggableField;
