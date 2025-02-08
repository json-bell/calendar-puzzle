import PanelBoard from "../PanelBoard/PanelBoard";
import puzzlePieces from "../../../puzzle/puzzlePieces";
import PuzzlePiece from "../PuzzlePiece/PuzzlePiece";
import styles from "./GameArea.module.css";
import GameProvider from "../../../context/Game/GameProvider";
import SelectionProvider from "../../../context/UserSelection/SelectionProvider";

const GameArea = () => {
  return (
    <GameProvider>
      <SelectionProvider>
        <section className={styles.gameArea}>
          <PanelBoard />
          <div className={styles.piecesContainer}>
            {puzzlePieces.map((piece) => (
              <PuzzlePiece piece={piece} key={piece.pieceId} />
            ))}
          </div>
        </section>
      </SelectionProvider>
    </GameProvider>
  );
};

export default GameArea;
