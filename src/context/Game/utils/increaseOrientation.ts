import uniqueOrientations from "../../../puzzle/rotations/uniqueOrientations";
import { PieceFlipped, PieceRotation } from "../../../puzzle/types";

const increaseOrientation = (
  input: { rotation: PieceRotation; flipped: PieceFlipped },
  pieceId: number
) => {
  const { uniqueFlips, uniqueRotations } = uniqueOrientations[pieceId];
  const rotation = ((input.rotation + 1) % uniqueRotations) as PieceRotation;
  const didRotationRollOver = rotation === 0;
  const flipped =
    uniqueFlips === 1
      ? 0
      : ((didRotationRollOver
          ? (input.flipped + 1) % 2
          : input.flipped) as PieceFlipped);
  return { rotation, flipped };
};

// const increaseOrientation = (
//   input: { rotation: PieceRotation; flipped: PieceFlipped },
//   pieceId: number
// ): { rotation: PieceRotation; flipped: PieceFlipped } => {
//   const { uniqueFlips, uniqueRotations } = uniqueOrientations[pieceId];

//   if (uniqueFlips === 2) {
//     if (input.flipped === 0 && input.rotation === uniqueRotations - 1)
//       return { rotation: 1, flipped: 1 };
//     if (input.flipped === 1 && input.rotation === 0)
//       return {
//         rotation: 0,
//         flipped: 0,
//       };
//   }

//   const rotation = ((input.rotation + 1) % uniqueRotations) as PieceRotation;

//   return { ...input, rotation };
// };

export default increaseOrientation;
