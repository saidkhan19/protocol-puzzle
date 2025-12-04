import { useState } from "react";

import { shuffle } from "@/utils/array";
import type { ProtocolField } from "@/data";
import { useGameContext } from "./context";
import DraggableField from "./DraggableField";

const MAX_DISPLAYED_FIELDS = 7;

const ProtocolFields = () => {
  const { getUninsertedFields } = useGameContext();
  const fields = getUninsertedFields();

  const [shuffledIds] = useState(() => {
    const ids = fields.map((f) => f.id);
    shuffle(ids);
    return ids;
  });

  // Map to get current field objects, preserving shuffle order
  const fieldMap = new Map(fields.map((f) => [f.id, f]));
  const displayedFields = shuffledIds
    .map((id) => fieldMap.get(id))
    .filter(Boolean) // Remove fields that no longer exist
    .slice(0, MAX_DISPLAYED_FIELDS) as ProtocolField[];

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {displayedFields.map((f) => (
        <DraggableField key={f.id} field={f} />
      ))}
    </div>
  );
};

export default ProtocolFields;
