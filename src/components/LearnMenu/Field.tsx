import type { ProtocolField, ProtocolFrame } from "@/data";
import { useActiveFrame } from "@/store/selectors";
import { getField } from "@/utils/data-transforms";

type FieldProps = {
  field: ProtocolFrame["structure"][number][number];
  activeField: ProtocolField | null;
  setActiveField: (field: ProtocolField) => void;
};

const Field = ({ field, activeField, setActiveField }: FieldProps) => {
  const frame = useActiveFrame();
  const currentField = getField(frame, field.fieldId);

  return (
    <div
      key={field.fieldId}
      style={{ width: `${field.width}%` }}
      className="p-1 sm:p-1.5"
    >
      <div
        className={`h-11 px-0.5 flex justify-center items-center border-2 sm:border-3 border-blue-900 shadow-hard-primary-2 rounded-2xl cursor-pointer ${
          activeField === currentField ? "bg-amber-500" : ""
        }`}
        onClick={() => setActiveField(currentField)}
      >
        <span className="text-center font-bold text-xs sm:text-sm tracking-widest leading-none text-clip overflow-hidden select-none">
          {currentField.name}
        </span>
      </div>
    </div>
  );
};

export default Field;
