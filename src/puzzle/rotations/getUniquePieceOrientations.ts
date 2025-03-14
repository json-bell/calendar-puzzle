import puzzlePieces from "../puzzlePieces";
import { PieceShape } from "../pieceTypes";
import getRotatedPiece from "./getRotatedPiece";
import { PieceRotation } from "../types";
import { UniqueOrientation } from "./types";

const getShapeSlug = <Booly>(rawShape: PieceShape<Booly>): string => {
  return rawShape
    .map((row) => row.map((bool) => (bool ? 1 : 0)).join(""))
    .join("-");
};

const degrees: PieceRotation[] = [1, 2, 3, 0];

export const getOrientationsFromPiece = <Booly>(
  shape: PieceShape<Booly>,
  pieceId: number
): UniqueOrientation => {
  const pieceSlug = getShapeSlug(shape);
  const rotatedShapes = degrees.map(
    (rotation: PieceRotation): PieceShape<Booly> =>
      getRotatedPiece(shape, rotation, 0)
  );
  const rotatedSlugs = rotatedShapes.map(getShapeSlug);
  const flippedShapes = rotatedShapes.map((rotatedShape) =>
    getRotatedPiece(rotatedShape, 0, 1)
  );
  const flippedSlugs = flippedShapes.map(getShapeSlug);

  const uniqueRotations = (rotatedSlugs.indexOf(pieceSlug) + 1) as 1 | 2 | 4;
  const uniqueFlips = flippedSlugs.includes(pieceSlug) ? 1 : 2;
  return { pieceId, uniqueRotations, uniqueFlips };
};

const getUniquePieceOrientations = () => {
  return puzzlePieces.map(({ shape, pieceId }) =>
    getOrientationsFromPiece(shape, pieceId)
  );
};

export default getUniquePieceOrientations;
