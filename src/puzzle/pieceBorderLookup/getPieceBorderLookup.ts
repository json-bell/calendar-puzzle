import { PieceShape } from "../pieceTypes";
import getPieceBorders from "./getPieceBorders";
import { PiecesBorderLookup } from "./types";

const getPieceBorderLookup = (
  pieces: PieceShape<0 | 1>[]
): PiecesBorderLookup => {
  return pieces.map(getPieceBorders);
};

export default getPieceBorderLookup;
