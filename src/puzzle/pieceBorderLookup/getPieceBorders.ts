import { PieceShape } from "../pieceTypes";
import { CellEdgeBorders, PieceBorders } from "./types";

const getPieceBorders = (piece: PieceShape<0 | 1>): PieceBorders => {
  const getCellPresence = (cellY: number, cellX: number): boolean => {
    return !piece[cellY]?.[cellX];
  };

  return piece.map(
    (row, cellY) =>
      row.map((_, cellX): CellEdgeBorders => {
        const top = getCellPresence(cellY - 1, cellX);
        const left = getCellPresence(cellY, cellX - 1);
        const bottom = getCellPresence(cellY + 1, cellX);
        const right = getCellPresence(cellY, cellX + 1);

        return { top, left, right, bottom };
      }) as [CellEdgeBorders]
  );
};

export default getPieceBorders;
