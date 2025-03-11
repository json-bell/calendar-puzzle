import { CellType, PieceShape } from "../pieceTypes";
import { PieceFlipped, PieceRotation } from "../types";

export type CellEdgeBorders = {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
};

export type CornerRadii = [boolean, boolean, boolean, boolean];
export type RenderingCellBorders = CellEdgeBorders & {
  cornerRadii: CornerRadii;
};

export type PieceBorders = PieceShape<CellEdgeBorders>;

export type PiecesBorderLookup = PieceBorders[];

export type BorderProcessingArgs = {
  rotation: PieceRotation;
  flipped: PieceFlipped;
} & Pick<CellType, "cellX" | "cellY" | "pieceId">;
