import getCellSlug from "../cell/getCellSlug";
import { CellType } from "../pieceTypes";
import { PieceId } from "../puzzlePieces/pieceIds";
import {
  GamePiece,
  PositionMap,
  PieceFlipped,
  PiecePosition,
  PieceRotation,
} from "../types";

export type MinimalPosition = {
  pieceId: PieceId;
  panelX: number;
  panelY: number;
  rotation?: PieceRotation;
  flipped?: PieceFlipped;
  cell?: CellType;
};

export const expandSinglePiecePosition = ({
  panelX,
  panelY,
  pieceId,
  cell,
  flipped,
  rotation,
}: MinimalPosition): PiecePosition => {
  const cellWithFallback: CellType = cell ?? {
    pieceId,
    cellX: 0,
    cellY: 0,
    cellSlug: getCellSlug({ cellX: 0, cellY: 0, pieceId }),
  };
  const rotationWithFallback: PieceRotation = rotation ?? 0;
  const flippedWithFallback: PieceFlipped = flipped ?? 0;
  return {
    panelX,
    panelY,
    cell: cellWithFallback,
    rotation: rotationWithFallback,
    flipped: flippedWithFallback,
  };
};

const expandPiecePositions = (
  minimalPositions: MinimalPosition[]
): PositionMap => {
  const positionEntries: [PieceId, PiecePosition][] = minimalPositions.map(
    (minimalPos) => [minimalPos.pieceId, expandSinglePiecePosition(minimalPos)]
  );

  return Object.fromEntries(positionEntries);
};

export const addExtraPiecePositions = ({
  gamePieces,
  positionMap,
}: {
  gamePieces: GamePiece[];
  positionMap: PositionMap;
}): GamePiece[] => {
  return gamePieces.map(({ piece, position }) => {
    const newPosition = positionMap[piece.pieceId] || position;

    return { piece, position: newPosition };
  });
};

export default expandPiecePositions;
