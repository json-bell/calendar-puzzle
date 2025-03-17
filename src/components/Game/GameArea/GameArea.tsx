import BoardGrid from "../BoardGrid/BoardGrid";
import styles from "./GameArea.module.css";
import GameProvider from "../../../context/Game/GameProvider";
import GameControls from "../../UI/GameControls/GameControls";
import PieceList from "../../UI/PieceList/PieceList";

const GameArea = () => {
  return (
    <GameProvider>
      <section className={styles.gameArea}>
        <div className={styles.boardArea}>
          <BoardGrid />
        </div>
        <div className={styles.gameControls}>
          <GameControls />
        </div>
        <div className={styles.piecesContainer}>
          <PieceList />
        </div>
      </section>
    </GameProvider>
  );
};

export default GameArea;
