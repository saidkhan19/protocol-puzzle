import { useState } from "react";

import type { Page } from "./types/page";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import GameMenu from "./components/GameMenu";
import Gameplay from "./components/Gameplay";
import LearnMenu from "./components/LearnMenu";
import useGameStore from "./store/useGameStore";

const App = () => {
  const isPlaying = useGameStore((state) => state.gameStatus !== "idle");
  const [page, setPage] = useState<Page>(isPlaying ? "game" : "menu");

  return (
    <>
      <Header />
      <main className="min-h-[700px] w-full max-w-2xl mt-4 sm:mt-8 px-2 py-8 sm:p-8 bg-sky-50 border-4 border-blue-900 rounded-4xl shadow-hard-primary-8">
        {page === "menu" && <GameMenu setPage={setPage} />}
        {page === "game" && <Gameplay setPage={setPage} />}
        {page === "learn" && <LearnMenu setPage={setPage} />}
      </main>
      <Footer />
    </>
  );
};

export default App;
