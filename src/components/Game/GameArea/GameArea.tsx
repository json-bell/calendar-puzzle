import PanelBoard from "../PanelBoard/PanelBoard";
import puzzlePieces from "../../../puzzle/puzzlePieces";
import PuzzlePiece from "../PuzzlePiece/PuzzlePiece";
import styles from "./GameArea.module.css";
import GameProvider from "../GameProvider/GameProvider";

const GameArea = () => {
  return (
    <GameProvider>
      <section className={styles.gameArea}>
        <PanelBoard />
        {/* Pieces */}
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
