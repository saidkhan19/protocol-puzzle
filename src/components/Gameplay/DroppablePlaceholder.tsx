import { useDroppable } from "@dnd-kit/core";

import { useGameContext } from "./context";
import { getField } from "@/utils/data-transforms";
import type { ProtocolFrame } from "@/data";
import DraggableField from "./DraggableField";

type PlaceholderProps = {
  field: ProtocolFrame["structure"][number][number];
};

const DroppablePlaceholder = ({ field }: PlaceholderProps) => {
  const { frame, getFieldAt } = useGameContext();
  const { setNodeRef } = useDroppable({ id: field.fieldId });

  const fieldInfo = getField(frame, field.fieldId);
  const insertedField = getFieldAt(field.fieldId);

  return (
    <div
      className="p-1 sm:p-2"
      style={{ minWidth: 60, flexBasis: `${field.width}%` }}
    >
      <div
        ref={setNodeRef}
        data-placeholder
        className="relative h-12 flex justify-center items-center my-border-dashed-blue select-none group"
      >
        {insertedField && <DraggableField field={insertedField} />}
        <p className="w-full px-1 absolute left-0 top-1/2 -translate-y-1/2 font-bold text-xs tracking-widest text-gray-600 text-nowrap text-center leading-none">
          <span className="align-middle pr-0.5">{"["}</span>
          <span className="inline-block max-w-1/2 overflow-hidden text-clip align-middle">
            {fieldInfo.size}
          </span>
          <span className="align-middle pl-0.5">{"]"}</span>
        </p>
      </div>
    </div>
  );
};

export default DroppablePlaceholder;
