import useGameStore from "@/store/useGameStore";
import type { SetPage } from "@/types/page";
import { getFrame, getProtocol } from "@/utils/data-transforms";

type HeaderProps = {
  setPage: SetPage;
};

const Header = ({ setPage }: HeaderProps) => {
  const frameId = useGameStore((state) => state.frameId);

  const frame = frameId ? getFrame(frameId) : null;
  const protocol = frame && getProtocol(frame.protocolId);

  return (
    <div className="min-h-62 sm:min-h-44 w-3/4 sm:w-2/3">
      {frame ? (
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-2xl sm:text-4xl text-center">
            {frame.gameTitle}
          </h2>
          <p className="mt-3 font-bold text-sm text-center">
            {protocol?.description}
          </p>
          <button
            className="mt-3 px-6 border-2 border-black shadow-hard-dark-2 font-bold text-sm cursor-pointer"
            onClick={() => setPage("learn")}
          >
            Learn
          </button>
        </div>
      ) : (
        <>
          <h2 className="font-bold text-2xl sm:text-4xl text-center">
            Learn Network Protocols
          </h2>
          <p className="mt-3 font-bold text-base text-center">
            Organize protocol fields in the correct order. Test your knowledge
            of HTTP, TCP, IPv4, IPv6, and other networking fundamentals.
          </p>
        </>
      )}
    </div>
  );
};

export default Header;
