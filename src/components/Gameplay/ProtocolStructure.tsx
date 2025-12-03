import type { ProtocolFrame } from "@/data";
import { useGameContext } from "./context";
import DroppablePlaceholder from "./DroppablePlaceholder";

type FieldRowProps = {
  row: ProtocolFrame["structure"][number];
};

const FieldRow = ({ row }: FieldRowProps) => {
  return (
    <div className="flex">
      {row.map((f) => (
        <DroppablePlaceholder key={f.fieldId} field={f} />
      ))}
    </div>
  );
};

const ProtocolStructure = () => {
  const { frame } = useGameContext();

  return (
    <div>
      {frame.structure.map((row, i) => (
        <FieldRow key={i} row={row} />
      ))}
    </div>
  );
};

export default ProtocolStructure;
