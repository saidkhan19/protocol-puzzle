import type { ProtocolField, ProtocolFrame } from "@/data";
import { useActiveFrame } from "@/store/selectors";
import Field from "./Field";

type FieldsProps = {
  activeField: ProtocolField | null;
  setActiveField: (field: ProtocolField) => void;
};

type FieldRowProps = FieldsProps & {
  row: ProtocolFrame["structure"][number];
};

const FieldRow = ({ row, activeField, setActiveField }: FieldRowProps) => {
  return (
    <div className="flex">
      {row.map((field) => (
        <Field
          key={field.fieldId}
          field={field}
          activeField={activeField}
          setActiveField={setActiveField}
        />
      ))}
    </div>
  );
};

const Fields = ({ activeField, setActiveField }: FieldsProps) => {
  const frame = useActiveFrame();

  return (
    <div className="w-full mt-6">
      {frame.structure.map((row, i) => (
        <FieldRow
          key={i}
          row={row}
          activeField={activeField}
          setActiveField={setActiveField}
        />
      ))}
    </div>
  );
};

export default Fields;
