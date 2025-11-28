import { useImperativeHandle, type Ref } from "react";
import { motion, useAnimate } from "motion/react";

export type SelectTextHandle = {
  triggerAnimation: () => void;
};

type SelectTextProps = {
  ref: Ref<SelectTextHandle>;
};

const SelectText = ({ ref }: SelectTextProps) => {
  const [scope, animate] = useAnimate();

  useImperativeHandle(
    ref,
    () => ({
      triggerAnimation: () => {
        animate(
          "[data-bracket-left]",
          { opacity: 1, x: [-10, 0] },
          { opacity: { duration: 0 } }
        );
        animate(
          "[data-bracket-right]",
          { opacity: 1, x: [10, 0] },
          { opacity: { duration: 0 } }
        );
      },
    }),
    [animate]
  );

  return (
    <p className="relative font-work-sans font-semibold text-sm" ref={scope}>
      <motion.span
        data-bracket-left
        className="absolute z-0 -left-3 -top-1 font-bold text-xl text-red-600 opacity-0"
      >
        {"["}
      </motion.span>
      <motion.span
        data-bracket-right
        className="absolute z-0 -right-3 -top-1 font-bold text-xl text-red-600 opacity-0"
      >
        {"]"}
      </motion.span>

      <span className="relative z-10">Select a protocol:</span>
    </p>
  );
};

export default SelectText;
