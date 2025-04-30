import { useEffect, useState } from "react";
import useGameState from "../../../../../context/Game/state";
import Modal from "../../../Modal/Modal";
import ControlButton from "../../ControlButton";
import { useChallengeDate } from "../../../../../context/ChosenDate/ChallengeDateContext";

const WinDetailsButton = () => {
  const { isWin } = useGameState();
  const { date } = useChallengeDate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpen = () => {
    if (isWin) setIsModalOpen(true);
  };

  useEffect(onOpen, [isWin]);

  return (
    <>
      <ControlButton text={"Win details"} inactive={!isWin} onClick={onOpen} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        You completed the puzzle! <br />
        Today's date: {date.toDateString()} <br />
        Styling and details to come in future version
      </Modal>
    </>
  );
};

export default WinDetailsButton;
