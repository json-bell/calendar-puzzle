import { CellType, Piece } from "../pieceTypes";
import { PieceFlipped, PieceRotation } from "../types";

type CoordMapper = (coords: { x: number; y: number }) => {
  x: number;
  y: number;
};

export const getRotatedCellCoords = ({
  cell,
  piece,
  rotation,
  flipped,
}: {
  cell: CellType;
  piece: Piece;
  rotation: PieceRotation;
  flipped: PieceFlipped;
}): { rotatedCellX: number; rotatedCellY: number } => {
  const endY = piece.shape.length - 1;
  const endX = piece.shape[0].length - 1;

  const coordFlipLookup: Record<PieceFlipped, CoordMapper> = {
    0: (coords) => coords,
    1: ({ x, y }) => ({ y, x: endX - x }),
  };
  const coordRotationLookup: Record<PieceRotation, CoordMapper> = {
    0: (coords) => coords,
    1: ({ x, y }) => ({ x: endY - y, y: x }),
    2: ({ x, y }) => ({ x: endX - x, y: endY - y }),
    3: ({ x, y }) => ({ x: y, y: endX - x }),
  };

  const flipFn = coordFlipLookup[flipped];
  const rotateFn = coordRotationLookup[rotation];

  const { x, y } = rotateFn(flipFn({ x: cell.cellX, y: cell.cellY }));

  return { rotatedCellX: x, rotatedCellY: y };
};
