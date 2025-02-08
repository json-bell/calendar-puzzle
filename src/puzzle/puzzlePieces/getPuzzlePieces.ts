import { CellPresence, Piece, PieceShape } from "../pieceTypes";

const rowMap = (row: (0 | 1)[]) =>
  row.map((num: 0 | 1) => num === 1) as [boolean];
// this could actually be 1,2 or 3 length long but TS doesn't like Array.map preserving lengths

const getShapeFromData = (
  rawShape: PieceShape<0 | 1>
): PieceShape<CellPresence> => rawShape.map(rowMap);

const getIdFromData = (rawShape: PieceShape<0 | 1>): string => {
  return rawShape.map((row) => row.join("")).join("");
};

export const getPuzzlePieces = (rawShapes: PieceShape<0 | 1>[]): Piece[] => {
  return rawShapes.map((rawShape) => ({
    shape: getShapeFromData(rawShape),
    pieceId: getIdFromData(rawShape),
  }));
};
