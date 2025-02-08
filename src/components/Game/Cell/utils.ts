import { CellType } from "../../../puzzle/pieceTypes";

export const getCellFromId = (
  cellId: string
): Pick<CellType, "pieceId" | "rowIndex" | "colIndex" | "cellId"> => {
  const [pieceId, rowIndexStr, colIndexStr] = cellId.split("");
  return {
    pieceId,
    rowIndex: Number(rowIndexStr),
    colIndex: Number(colIndexStr),
    cellId,
  };
};
