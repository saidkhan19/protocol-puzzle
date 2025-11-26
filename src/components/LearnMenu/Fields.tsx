import type { ProtocolField, ProtocolFrame } from "@/data";
import type { Dispatch, SetStateAction } from "react";

type FieldsProps = {
  frame: ProtocolFrame;
  activeField: ProtocolField | null;
  setActiveField: Dispatch<SetStateAction<ProtocolField | null>>;
};

type FieldRowProps = FieldsProps & {
  row: ProtocolFrame["structure"][number];
};

const FieldRow = ({
  frame,
  row,
  activeField,
  setActiveField,
}: FieldRowProps) => {
  return (
    <div className="flex">
      {row.map((field) => {
        const currentField = frame.fields[field.fieldKey];

        return (
          <div
            key={field.fieldKey}
            style={{ width: `${field.width}%` }}
            className="p-1 sm:p-1.5"
          >
            <div
              className={`h-11 px-0.5 flex justify-center items-center border-2 sm:border-3 border-blue-900 shadow-hard-sm rounded-2xl cursor-pointer ${
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
      })}
    </div>
  );
};

const Fields = ({ frame, activeField, setActiveField }: FieldsProps) => {
  return (
    <div className="w-full mt-6">
      {frame.structure.map((row, i) => (
        <FieldRow
          key={i}
          frame={frame}
          row={row}
          activeField={activeField}
          setActiveField={setActiveField}
        />
      ))}
    </div>
  );
};

export default Fields;
