import { PieceShape } from "../pieceTypes";

export type CellEdgeBorders = {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
};

// export type CellCornerBorders = {
//   top_left: boolean; // = top && left
//   top_right: boolean; // = top && right
//   bottom_left: boolean; // = bottom && left
//   bottom_right: boolean; // = bottom && right
// };

export type PieceBorders = PieceShape<CellEdgeBorders>;

export type PiecesBorderLookup = PieceBorders[];
