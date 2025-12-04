import type { Ref } from "react";

import type { ProtocolField } from "@/data";

type FieldProps = {
  field: ProtocolField;
  ref?: Ref<HTMLDivElement>;
  style?: object;
  isDragging?: boolean;
  isInserted?: boolean;
};

const Field = ({
  field,
  ref,
  style,
  isDragging = false,
  isInserted = false,
  ...props
}: FieldProps) => {
  let classNames =
    "flex justify-center items-center border-3 border-blue-900 bg-sky-50 shadow-hard-primary-2 cursor-grab select-none text-center touch-none text-xs z-50";

  if (isDragging) {
    classNames += " px-4 py-2 w-fit max-w-40 rounded-3xl";
  } else if (isInserted) {
    classNames += " p-1 w-full h-full rounded-2xl sm:text-sm";
  } else {
    classNames += " px-6 py-3 rounded-3xl sm:text-sm";
  }

  return (
    <div ref={ref} style={style} {...props} className={classNames}>
      <span className="font-bold tracking-widest leading-none text-clip overflow-hidden">
        {field.name}
      </span>
    </div>
  );
};

export default Field;
