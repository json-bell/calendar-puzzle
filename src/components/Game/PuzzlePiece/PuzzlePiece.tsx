import styles from "./PuzzlePiece.module.css";
import Cell from "../Cell/Cell";
import EmptyCell from "../Cell/EmptyCell";
import type { CellType, Piece } from "../../../puzzle/pieceTypes";
import cx from "../../../utils/concatClassNames/concatClassNames";
import useGameState from "../../../context/Game/state";
import getCellSlug from "../../../puzzle/cell/getCellSlug";
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
          {row.map((isSquare, cellX) => {
            const cell: CellType = {
              pieceId: piece.pieceId,
              cellX,
              cellY,
              cellSlug: getCellSlug({ cellX, cellY, pieceId: piece.pieceId }),
            };
            return isSquare ? (
              <Cell key={cell.cellSlug} cell={cell} />
            ) : (
              <EmptyCell key={cell.cellSlug} />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default PuzzlePiece;
