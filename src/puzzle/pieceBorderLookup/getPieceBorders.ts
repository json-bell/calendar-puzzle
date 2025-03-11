import { PieceShape } from "../pieceTypes";
import { CellBorders, PieceBorders } from "./types";

const getPieceBorders = (piece: PieceShape<0 | 1>): PieceBorders => {
  const getCellPresence = (cellY: number, cellX: number): boolean => {
    return !piece[cellY]?.[cellX];
  };

  return piece.map(
    (row, cellY) =>
      row.map((_, cellX): CellBorders => {
        const top = getCellPresence(cellY - 1, cellX);
        const left = getCellPresence(cellY, cellX - 1);
        const bottom = getCellPresence(cellY + 1, cellX);
        const right = getCellPresence(cellY, cellX + 1);

        const corners = {
          top_left: top && left,
          top_right: top && right,
          bottom_left: bottom && left,
          bottom_right: bottom && right,
        };

        return { top, left, right, bottom, ...corners };
      }) as [CellBorders]
  );
};

export default getPieceBorders;
