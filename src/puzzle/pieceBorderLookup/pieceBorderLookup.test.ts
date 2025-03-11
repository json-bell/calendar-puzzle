import pieceBorderLookup from ".";
import { PieceShape } from "../pieceTypes";
import rawPieceData from "../puzzlePieces/rawPieceData";
import getPieceBorderLookup from "./getPieceBorderLookup";
import getPieceBorders from "./getPieceBorders";
import { CellBorders } from "./types";

const fullCellBorders: CellBorders = {
  bottom: true,
  bottom_left: true,
  bottom_right: true,
  left: true,
  right: true,
  top: true,
  top_left: true,
  top_right: true,
};

const emptyCellBorders: CellBorders = {
  bottom: false,
  bottom_left: false,
  bottom_right: false,
  left: false,
  right: false,
  top: false,
  top_left: false,
  top_right: false,
};

const emptyDirections: Partial<CellBorders> = {
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
        expect(fullPieceBorders[cellY][cellX]).toMatchObject({
          ...emptyDirections,
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
