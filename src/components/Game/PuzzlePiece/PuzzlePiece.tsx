import { PuzzlePieceType } from "../../../puzzle/puzzlePieces/getPuzzlePieces";
import styles from "./PuzzlePiece.module.css";
import Cell, { CellType } from "../Cell/Cell";
import EmptyCell from "../Cell/EmptyCell";
// import useMouse from "../../../utils/useMousePosition.ts/useMouse";

export interface PuzzlePieceProps {
  piece: PuzzlePieceType;
}

// type Position = { left: number; top: number };

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
