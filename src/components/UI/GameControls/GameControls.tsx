import { useChallengeDate } from "../../../context/ChosenDate/ChallengeDateContext";
import { useViewport } from "../../../utils/useWindowSize/windowSizeContext";
import ControlButton from "../ControlButtons/ControlButton";
import DeletePieceButton from "../ControlButtons/SpecificButtons/DeletePieceButton";
import styles from "./GameControls.module.css";

const GameControls: React.FC = () => {
  const viewport = useViewport();
  const { date } = useChallengeDate();
  return (
    <div className={styles.gameControlsContainer}>
      <h2 style={{ margin: 0 }}>{viewport} Menu</h2>
      <div>{date.toDateString()}</div>
      <div className={styles.buttonList}>
        <DeletePieceButton />
        <ControlButton text="Choose day" onClick={undefined} inactive />
        <ControlButton text="Hint" onClick={undefined} inactive />
      </div>
    </div>
  );
};

export default GameControls;
