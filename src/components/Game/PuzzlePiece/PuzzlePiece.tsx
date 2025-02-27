import styles from "./PuzzlePiece.module.css";
import Cell from "../Cell/Cell";
import EmptyCell from "../Cell/EmptyCell";
import type { Piece } from "../../../puzzle/pieceTypes";
import cx from "../../../utils/concatClassNames/concatClassNames";
import useGameState from "../../../context/Game/state";
// import useMouse from "../../../utils/useMousePosition.ts/useMouse";

export interface PuzzlePieceProps {
  piece: Piece;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({ piece }) => {
  const {
    userSelection: { selectedPiece },
  } = useGameState();

  return (
    <div
      data-testid={`puzzle-piece-${piece.pieceId}`}
      className={cx(
        styles.puzzlePiece,
        selectedPiece?.pieceId === piece.pieceId && styles.selectedPiece
      )}
    >
      {piece.shape.map((row, cellY) => (
        <div className={styles.pieceRow} key={cellY}>
          {row.map((cellPresence, cellX) => {
            return cellPresence ? (
              <Cell key={cellPresence.cellSlug} cell={cellPresence} />
            ) : (
              <EmptyCell key={`${cellX}-empty`} />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default PuzzlePiece;
