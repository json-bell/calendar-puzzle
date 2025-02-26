import { PieceShape } from "../pieceTypes";
import { PieceFlipped, PieceRotation } from "../types";

const rotatePieceOnce = <T>(shape: PieceShape<T>): PieceShape<T> => {
  const firstRow = shape[0];
  const newRows = firstRow.map((_, index) => {
    return shape.map((row) => row[index]).reverse();
  });

  return newRows as PieceShape<T>;
};

const getRotatedPiece = <T>(
  shape: PieceShape<T>,
  rotation: PieceRotation,
  flipped: PieceFlipped
): PieceShape<T> => {
  if (rotation === 0 && flipped === 0) return shape;
  if (flipped !== 0) {
    const flippedOnce = shape.map((row) => row.toReversed()) as PieceShape<T>;
    return getRotatedPiece(flippedOnce, rotation, 0);
  }
  const rotatedOnce = rotatePieceOnce(shape);
  const newRotation = (rotation - 1) as 0 | 1 | 2;
  return getRotatedPiece(rotatedOnce, newRotation, 0);
};

export default getRotatedPiece;
