import { GamePiece, PiecePosition } from "../types";

export const hasPosition = (
  gamePiece: GamePiece
): gamePiece is GamePiece & { position: PiecePosition } => !!gamePiece.position;
