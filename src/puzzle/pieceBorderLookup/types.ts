import { PieceShape } from "../pieceTypes";

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
