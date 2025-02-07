import React, { useState } from "react";
import { PuzzlePieceType } from "../../../puzzle/puzzlePieces/getPuzzlePieces";
import styles from "./PuzzlePiece.module.css";
import joinStyles from "../../../utils/concatStyles/concatStyles";
// import useMouse from "../../../utils/useMousePosition.ts/useMouse";

export interface PuzzlePieceProps {
  piece: PuzzlePieceType;
}

type Position = { left: number; top: number };
type Cell = { pieceId: string; rowIndex: number; colIndex: number };

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({ piece }) => {
  // const mouse = useMouse();
  const [piecePosition, setPiecePosition] = useState<null | Position>(null);
  const [draggedCell, setDraggedCell] = useState<null | Cell>(null);

  // useEffect(() => {
  //   if (draggedCell === cell && mouse?.buttons)
  //     setPiecePosition(mouse.position);
  // }, [mouse, draggedCell]);

  return (
    <div
      className={styles.puzzlePiece}
      style={
        piecePosition && draggedCell
          ? { position: "absolute", ...piecePosition! }
          : {}
      }
    >
      {piece.shape.map((row, rowIndex) => (
        <div className={styles.pieceRow} key={rowIndex}>
          {row.map((isSquare, colIndex) => {
            const cell: Cell = { pieceId: piece.pieceId, rowIndex, colIndex };
            return (
              <div
                key={colIndex}
                className={joinStyles(
                  styles.square,
                  isSquare && styles.presentSquare
                )}
                onMouseDown={(e) => {
                  setDraggedCell(cell);
                  setPiecePosition({
                    left: e.pageX - 40 - 84 * colIndex,
                    top: e.pageY - 40 - 84 * rowIndex,
                  });
                }}
                onMouseUp={() => {
                  setDraggedCell(null);
                  setPiecePosition(null);
                }}
                onMouseMove={(e) => {
                  if (e.buttons === 0) setDraggedCell(null);
                  if (draggedCell === cell || !draggedCell)
                    setPiecePosition({
                      left: e.pageX - 40 - 84 * colIndex,
                      top: e.pageY - 40 - 84 * rowIndex,
                    });
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default PuzzlePiece;
