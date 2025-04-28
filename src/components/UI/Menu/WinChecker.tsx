import { useEffect, useState } from "react";
import { useChallengeDate } from "../../../context/ChosenDate/ChallengeDateContext";
import useGameState from "../../../context/Game/state";
import checkWin from "../../../puzzle/challenge/checkWin";
import Modal from "../Modal/Modal";

type WinCheckerProps = { _?: never };

const WinChecker: React.FC<WinCheckerProps> = () => {
  const { board } = useGameState();
  const { checkIsChallengeValue } = useChallengeDate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isWin = checkWin({ checkIsChallengeValue, board });
  useEffect(() => {
    if (isWin) setIsModalOpen(true);
  }, [isWin]);
  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={() => {}}>
        You won!
      </Modal>
    </div>
  );
};

export default WinChecker;
