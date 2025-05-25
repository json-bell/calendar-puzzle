import puzzlePieces from ".";
import expandPiecePositions, {
  addExtraPiecePositions,
  MinimalPosition,
} from "../game/expandPositions";
import { GamePiece } from "../types";

export const piecesFromPositions = (
  minimalPositions: MinimalPosition[]
): GamePiece[] => {
  const positionMap = expandPiecePositions(minimalPositions || []);
  const gamePieces = addExtraPiecePositions({
    gamePieces: puzzlePieces.map((piece) => ({ piece, position: null })),
    positionMap: positionMap,
  });
  return gamePieces;
};
