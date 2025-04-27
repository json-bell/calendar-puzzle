import { UniqueOrientation } from "../../../puzzle/rotations/types";
import uniqueOrientations from "../../../puzzle/rotations/uniqueOrientations";
import { PieceOrientation, PieceRotation } from "../../../puzzle/types";

const rollRotation = ({
  rotation,
  uniqueRotations,
}: {
  rotation: PieceRotation;
  uniqueRotations: UniqueOrientation["uniqueRotations"];
}): PieceRotation => {
  return ((rotation + 1) % uniqueRotations) as PieceRotation;
};

const increaseOrientation = (
  { rotation, flipped }: PieceOrientation,
  pieceId: number
): PieceOrientation => {
  const { uniqueFlips, uniqueRotations } = uniqueOrientations[pieceId];

  if (uniqueFlips === 2) {
    if (flipped === 0) {
      // end of 1st rotation cycle
      if (rotation + 1 === uniqueRotations) return { rotation: 1, flipped: 1 };
    } else {
      // end of mirrored rotation cycle
      if (rotation === 0) return { rotation: 0, flipped: 0 };
    }
  }

  return { flipped, rotation: rollRotation({ rotation, uniqueRotations }) };
};

export default increaseOrientation;
