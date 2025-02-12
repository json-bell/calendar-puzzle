import BoardGrid from "../BoardGrid/BoardGrid";
import puzzlePieces from "../../../puzzle/puzzlePieces";
import PuzzlePiece from "../PuzzlePiece/PuzzlePiece";
import styles from "./GameArea.module.css";
import GameProvider from "../../../context/Game/GameProvider";

const GameArea = () => {
  return (
    <GameProvider>
      <section className={styles.gameArea}>
        <BoardGrid />
        <div className={styles.piecesContainer}>
          {puzzlePieces.map((piece) => (
            <PuzzlePiece piece={piece} key={piece.pieceId} />
          ))}
        </div>
      </section>
    </GameProvider>
  );
};

export default GameArea;
