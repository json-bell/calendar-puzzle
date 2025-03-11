import pieceBorderLookup from ".";
import { CellType } from "../pieceTypes";
import { PieceFlipped, PieceRotation } from "../types";
import { processBorders } from "./processBorders";
import { RenderingCellBorders, CornerRadii } from "./types";

const getProcessedBorders = ({
  rotation,
  flipped,
  cellX,
  cellY,
  pieceId,
}: {
  rotation: PieceRotation;
  flipped: PieceFlipped;
} & Pick<CellType, "cellX" | "cellY" | "pieceId">): RenderingCellBorders => {
  const originalBorders = pieceBorderLookup[pieceId][cellY][cellX];

  const processedBorders = processBorders(originalBorders, {
    rotation,
    flipped,
  });

  const { bottom, left, right, top } = processedBorders;

  const cornerRadii: CornerRadii = [
    top && left,
    top && right,
    bottom && right,
    bottom && left,
  ];

  return { ...processedBorders, cornerRadii };
};

export default getProcessedBorders;
