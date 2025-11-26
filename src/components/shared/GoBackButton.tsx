import ArrowLeft from "@/assets/icons/arrow-left.svg?react";

type GoBackButtonProps = {
  onClick: () => void;
};

const GoBackButton = ({ onClick }: GoBackButtonProps) => {
  return (
    <button
      className="absolute left-0 top-0 px-3 py-1.5 bg-amber-500 shadow-hard rounded-md cursor-pointer"
      title="Go back"
      onClick={onClick}
    >
      <ArrowLeft />
      <span className="sr-only">Go back to Menu</span>
    </button>
  );
};

export default GoBackButton;
