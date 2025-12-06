import { motion } from "motion/react";

import { assertGameResults } from "@/store/assert";
import useGameStore from "@/store/useGameStore";

const Results = () => {
  const gameStatus = useGameStore((state) => state.gameStatus);
  const gameResults = useGameStore((state) => state.gameResultPayload);
  const startGame = useGameStore((state) => state.startGame);

  assertGameResults(gameResults);

  const handleStartGame = () => {
    startGame();
  };

  const hasNewRecord =
    gameResults.previousRecord &&
    gameResults.previousRecord > gameResults.duration;

  return (
    <motion.div
      initial={{ scale: 0.7 }}
      animate={{ scale: 1 }}
      className="flex flex-col gap-6 justify-center items-center"
    >
      <div className="max-w-96 w-full p-4 border-3 rounded-3xl border-blue-900 shadow-hard-primary-2">
        {gameStatus === "won" ? (
          <>
            <h2 className="font-work-sans font-bold text-3xl text-center uppercase text-blue-900">
              You got it right!
            </h2>
            <p className="font-medium text-center text-sm">
              Your time: {gameResults.duration}s
            </p>
            {hasNewRecord && (
              <p className="font-medium text-center text-sm">New record!</p>
            )}
          </>
        ) : (
          <>
            <h2 className="font-work-sans font-bold text-3xl text-center uppercase text-blue-900">
              {gameStatus === "timeout" ? "Timeout!" : "You lost!"}
            </h2>
            <p className="font-medium text-center text-base">
              Your score:{" "}
              <span className="tracking-widest">
                {gameResults.correct}/{gameResults.total}
              </span>
            </p>
          </>
        )}
      </div>

      <button
        className={`h-12 px-10 border-3 shadow-hard-primary-2 text-blue-900 font-work-sans font-semibold
          text-2xl sm:text-3xl rounded-3xl bg-amber-500 cursor-pointer`}
        onClick={handleStartGame}
      >
        {gameStatus === "won" ? "Play again" : "Try again"}
      </button>
    </motion.div>
  );
};

export default Results;
