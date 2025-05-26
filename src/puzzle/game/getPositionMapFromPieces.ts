import { PieceId } from "../puzzlePieces/pieceIds";
import { GamePiece, PiecePosition, PositionMap } from "../types";
import { hasPosition } from "../utils/hasPosition";

const getPositionMapFromPieces = (gamePieces: GamePiece[]): PositionMap => {
  const entries: [PieceId, PiecePosition][] = gamePieces
    .filter(hasPosition)
    .map(({ piece, position }) => {
      return [piece.pieceId, position];
    });

  return Object.fromEntries(entries);
};

export default getPositionMapFromPieces;
