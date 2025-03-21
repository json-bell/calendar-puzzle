import ControlButton from "../Button/ControlButton";
import DeletePieceButton from "../Button/SpecificButtons/DeletePieceButton";
import styles from "./GameControls.module.css";

const GameControls: React.FC = () => {
  return (
    <div className={styles.gameControlsContainer}>
      <h2 style={{ margin: 0 }}> Menu</h2>
      <div className={styles.buttonList}>
        <DeletePieceButton />
        <ControlButton text="Choose day" onClick={undefined} inactive />
        <ControlButton text="Hint" onClick={undefined} inactive />
      </div>
    </div>
  );
};

export default GameControls;
