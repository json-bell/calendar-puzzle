import pieceBorderLookup from ".";
import { PieceShape } from "../pieceTypes";
import rawPieceData from "../puzzlePieces/rawPieceData";
import getPieceBorderLookup from "./getPieceBorderLookup";
import getPieceBorders from "./getPieceBorders";
import { CellEdgeBorders } from "./types";

const fullCellBorders: CellEdgeBorders = {
  bottom: true,
  left: true,
  right: true,
  top: true,
};

const emptyCellBorders: CellEdgeBorders = {
  bottom: false,
  left: false,
  right: false,
  top: false,
};

describe("getPieceBorders", () => {
  it("appropriately handles empty shape", () => {
    const emptyPiece: PieceShape<0> = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    expect(getPieceBorders(emptyPiece)).toEqual(
      Array(3).fill(Array(3).fill(fullCellBorders))
    );
  });
  describe("appropriately handles full shape", () => {
    const fullPiece: PieceShape<1> = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];

    const fullPieceBorders = getPieceBorders(fullPiece);
    it("correctly calculates center", () => {
      expect(fullPieceBorders[1][1]).toEqual(emptyCellBorders);
    });
    const cornerCoords = [
      [0, 0],
      [0, 2],
      [2, 0],
      [2, 2],
    ];

    it.each(cornerCoords)(
      "correctly finds the corner value",
      (cellY, cellX) => {
        expect(fullPieceBorders[cellY][cellX]).toEqual({
          ...emptyCellBorders,
          [cellY ? "bottom" : "top"]: true,
          [cellX ? "right" : "left"]: true,
        });
      }
    );
  });
});

describe("Piece Border Lookup", () => {
  it("matches generatePieceBorderLookup", () => {
    expect(getPieceBorderLookup(rawPieceData)).toEqual(pieceBorderLookup);
  });
});
