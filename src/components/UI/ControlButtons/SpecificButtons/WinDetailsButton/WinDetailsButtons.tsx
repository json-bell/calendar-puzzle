import { useEffect, useState } from "react";
import useGameState from "../../../../../context/Game/state";
import Modal from "../../../Modal/Modal";
import ControlButton from "../../ControlButton";
import { useChallengeDate } from "../../../../../context/ChosenDate/ChallengeDateContext";

const WinDetailsButton = () => {
  const {
    winDetails: { isWin, flippedPieceCount },
  } = useGameState();
  const { date } = useChallengeDate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    if (isWin) setIsModalOpen(true);
  };

  useEffect(handleOpen, [isWin]);

  return (
    <>
      <ControlButton
        text={"Win details"}
        inactive={!isWin}
        onClick={handleOpen}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <br />
        Well done on completing the puzzle for: <br />
        {date.toDateString()} <br />
        with {flippedPieceCount} flipped pieces
        <br />
        <br />
        If you want to return this screen, click the <br />
        'Win Details' button in the Menu <br />
        <br />
        Further styling and details to come in future version
        <ControlButton text="Close" onClick={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default WinDetailsButton;
