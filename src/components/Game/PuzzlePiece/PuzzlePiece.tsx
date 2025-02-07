import { PuzzlePieceType } from "../../../puzzle/puzzlePieces/getPuzzlePieces";
import styles from "./PuzzlePiece.module.css";
import Cell from "../Cell/Cell";
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
            const cell = { pieceId: piece.pieceId, rowIndex, colIndex };
            return isSquare ? (
              <Cell key={piece.pieceId} cell={cell} />
            ) : (
              <EmptyCell key={piece.pieceId} />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default PuzzlePiece;
