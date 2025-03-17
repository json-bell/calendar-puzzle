import DeletePieceButton from "../Button/SpecificButtons/DeletePieceButton";
import styles from "./GameControls.module.css";

const GameControls: React.FC = () => {
  return (
    <div className={styles.gameControlsContainer}>
      <h2 style={{ margin: 0 }}> Menu</h2>
      <DeletePieceButton />
    </div>
  );
};

export default GameControls;
