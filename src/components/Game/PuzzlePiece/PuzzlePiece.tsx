import styles from "./PuzzlePiece.module.css";
import Cell from "../Cell/Cell";
import EmptyCell from "../Cell/EmptyCell";
import type { CellType, Piece } from "../../../puzzle/pieceTypes";
import useUserSelection from "../../../context/UserSelection/dispatch";
import cx from "../../../utils/concatClassNames/concatClassNames";
// import useMouse from "../../../utils/useMousePosition.ts/useMouse";

export interface PuzzlePieceProps {
  piece: Piece;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({ piece }) => {
  const {
    userSelection: { selectedPiece },
  } = useUserSelection();

  return (
    <div
      className={cx(
        styles.puzzlePiece,
        selectedPiece?.pieceId === piece.pieceId && styles.selectedPiece
      )}
    >
      {piece.shape.map((row, y) => (
        <div className={styles.pieceRow} key={y}>
          {row.map((isSquare, x) => {
            const cell: CellType = {
              pieceId: piece.pieceId,
              x,
              y,
              cellSlug: `${piece.pieceId}${x}${y}`,
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
