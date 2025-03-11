import pieceBorderLookup from ".";
import { processBorders } from "./processBorders";
import {
  RenderingCellBorders,
  CornerRadii,
  BorderProcessingArgs,
} from "./types";

const getProcessedBorders = ({
  rotation,
  flipped,
  cellX,
  cellY,
  pieceId,
}: BorderProcessingArgs): RenderingCellBorders => {
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
