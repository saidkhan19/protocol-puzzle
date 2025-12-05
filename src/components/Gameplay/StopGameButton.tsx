import { motion } from "motion/react";

import useGameStore from "@/store/useGameStore";

const StopGameButton = () => {
  const stopGame = useGameStore((state) => state.stopGame);

  const handleStopGame = () => {
    stopGame();
  };

  return (
    <motion.button
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className={`px-6 py-2 rounded-2xl shadow-hard-primary-2 border-3 border-blue-900 bg-amber-500
        font-bold font-work-sans text-blue-900 text-2xl cursor-pointer`}
      onClick={handleStopGame}
    >
      Done
    </motion.button>
  );
};

export default StopGameButton;
