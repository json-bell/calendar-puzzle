import getCellSlug from "../cell/getCellSlug";
import { CellPresence, Piece, PieceShape } from "../pieceTypes";
import { pieceIds } from "./pieceIds";

export const getShapeFromData = (
  rawShape: PieceShape<0 | 1>,
  id: number
): Piece["shape"] => {
  const pieceId = pieceIds[id];

  return rawShape.map(
    (row, cellY) =>
      row.map(
        (isPresent, cellX): CellPresence =>
          isPresent
            ? {
                cellX,
                cellY,
                pieceId,
                cellSlug: getCellSlug({ cellX, cellY, pieceId }),
              }
            : null
      ) as [CellPresence, CellPresence, CellPresence]
    // this could actually be 1, 2 or 3 length long but TS doesn't like Array.map preserving lengths
  );
};

export const getSlugFromData = (rawShape: PieceShape<0 | 1>): string => {
  return rawShape
    .map((row) => row.map((cell) => (cell ? 1 : 0)).join(""))
    .join("-");
};

export const getPuzzlePieces = (rawShapes: PieceShape<0 | 1>[]): Piece[] => {
  return rawShapes.map((rawShape, index) => ({
    shape: getShapeFromData(rawShape, index),
    pieceId: pieceIds[index],
    slug: getSlugFromData(rawShape),
  }));
};
