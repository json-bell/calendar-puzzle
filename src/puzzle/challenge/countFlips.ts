import { GamePiece } from "../types";

const countFlips = (gamePieces: GamePiece[]) => {
  return gamePieces.filter(({ position }) => position?.flipped).length;
};

export default countFlips;
