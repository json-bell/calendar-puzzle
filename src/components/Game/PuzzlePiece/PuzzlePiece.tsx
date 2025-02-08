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
      {piece.shape.map((row, rowIndex) => (
        <div className={styles.pieceRow} key={rowIndex}>
          {row.map((isSquare, colIndex) => {
            const cell: CellType = {
              pieceId: piece.pieceId,
              rowIndex,
              colIndex,
              cellId: `${piece.pieceId}${rowIndex}${colIndex}`,
            };
            return isSquare ? (
              <Cell key={cell.cellId} cell={cell} />
            ) : (
              <EmptyCell key={cell.cellId} />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default PuzzlePiece;
