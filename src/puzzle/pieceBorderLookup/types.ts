import { PieceShape } from "../pieceTypes";

export type CellBorders = {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;

  // maybe not: for whether the corners are curved.
  top_left: boolean; // = top && left
  top_right: boolean; // = top && right
  bottom_left: boolean; // = bottom && left
  bottom_right: boolean; // = bottom && right
};

export type PieceBorders = PieceShape<CellBorders>;

export type PiecesBorderLookup = PieceBorders[];
