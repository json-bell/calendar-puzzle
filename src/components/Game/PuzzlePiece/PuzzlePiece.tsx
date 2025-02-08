import styles from "./PuzzlePiece.module.css";
import Cell from "../Cell/Cell";
import EmptyCell from "../Cell/EmptyCell";
import type { CellType, Piece } from "../../../puzzle/pieceTypes";
// import useMouse from "../../../utils/useMousePosition.ts/useMouse";

export interface PuzzlePieceProps {
  piece: Piece;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({ piece }) => {
  return (
    <div className={styles.puzzlePiece}>
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
