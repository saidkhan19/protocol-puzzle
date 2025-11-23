import { useState } from "react";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import GameMenu from "./components/GameMenu";
import Gameplay from "./components/Gameplay";
import LearnMenu from "./components/LearnMenu";
import useGameStore from "./store/useGameStore";
import type { Page } from "./types/page";

const App = () => {
  const isPlaying = useGameStore((state) => Boolean(state.protocolId));
  const [page, setPage] = useState<Page>(isPlaying ? "game" : "menu");

  return (
    <>
      <Header />
      <main className="min-h-[700px] w-full max-w-2xl my-8 bg-sky-50 border-4 border-blue-900 rounded-2xl shadow-hard-lg">
        {page === "menu" && <GameMenu setPage={setPage} />}
        {page === "game" && <Gameplay setPage={setPage} />}
        {page === "learn" && <LearnMenu setPage={setPage} />}
      </main>
      <Footer />
    </>
  );
};

export default App;
