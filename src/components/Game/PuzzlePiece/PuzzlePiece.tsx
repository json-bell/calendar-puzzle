import React from "react";
import { PuzzlePieceType } from "../../../puzzle/puzzlePieces/getPuzzlePieces";
import styles from "./PuzzlePiece.module.css";
import joinStyles from "../../../utils/concatStyles/concatStyles";

export interface PuzzlePieceProps {
  piece: PuzzlePieceType;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({ piece }) => {
  return (
    <div className={styles.puzzlePiece}>
      {piece.shape.map((row) => (
        <div className={styles.pieceRow}>
          {row.map((isSquare) => (
            <div
              className={joinStyles(
                styles.square,
                isSquare && styles.presentSquare
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PuzzlePiece;
