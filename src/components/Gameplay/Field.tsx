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
    "px-6 py-2 border-3 border-blue-900 bg-sky-50 shadow-hard-primary-2 cursor-grab z-50 select-none text-center touch-none";

  if (isDragging) {
    classNames += " w-fit rounded-3xl";
  } else if (isInserted) {
    classNames += " w-full h-full rounded-2xl";
  } else {
    classNames += " rounded-3xl";
  }

  return (
    <div ref={ref} style={style} {...props} className={classNames}>
      <span className="font-bold text-sm tracking-widest">{field.name}</span>
    </div>
  );
};

export default Field;
