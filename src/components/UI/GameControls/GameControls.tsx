import DeletePieceButton from "../DeletePieceButton/DeletePieceButton";
import styles from "./GameControls.module.css";

const GameControls = () => {
  return (
    <div className={styles.gameControlsContainer}>
      <h2 style={{ margin: 0 }}> Menu</h2>
      <DeletePieceButton />
    </div>
  );
};

export default GameControls;
