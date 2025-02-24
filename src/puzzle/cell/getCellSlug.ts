import { CellType } from "../pieceTypes";

const getCellSlug = ({
  cellX,
  cellY,
  pieceId,
}: Pick<CellType, "cellX" | "cellY" | "pieceId">): string => {
  return `${pieceId}${cellX}${cellY}`;
};

export default getCellSlug;
