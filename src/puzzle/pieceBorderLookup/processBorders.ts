import { PieceFlipped, PieceRotation } from "../types";
import { CellEdgeBorders } from "./types";

const reverseShiftArray = ["top", "left", "bottom", "right"] as const;

export const getRotatedBorders = (
  borders: CellEdgeBorders,
  rotation: PieceRotation
): CellEdgeBorders => {
  if (rotation === 0) return borders;

  const entries: ["top" | "left" | "bottom" | "right", boolean][] =
    reverseShiftArray.map((key, index) => {
      return [key, borders[reverseShiftArray[(index + 1) % 4]]];
    });

  return getRotatedBorders(
    Object.fromEntries(entries) as CellEdgeBorders,
    (rotation - 1) as 0 | 1 | 2
  );
};

export const getFlippedBorders = (
  borders: CellEdgeBorders,
  flipped: PieceFlipped
) => {
  if (!flipped) return borders;
  return {
    ...borders,
    left: borders.right,
    right: borders.left,
  };
};

export const processBorders = (
  borders: CellEdgeBorders,
  { rotation, flipped }: { rotation: PieceRotation; flipped: PieceFlipped }
): CellEdgeBorders => {
  return getRotatedBorders(getFlippedBorders(borders, flipped), rotation);
};
