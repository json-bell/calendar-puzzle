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
        <br />
        Well done on completing the puzzle for: <br />
        {date.toDateString()} <br />
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
