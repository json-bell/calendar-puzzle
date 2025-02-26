import { PieceShape } from "../pieceTypes";
import getRotatedPiece from "./getRotatedPiece";

describe("getRotatedPiece", () => {
  const basePiece: PieceShape<number> = [
    [1, 2, 3],
    [4, 5, 6],
  ];
  const rotatedOnce: PieceShape<number> = [
    [4, 1],
    [5, 2],
    [6, 3],
  ];
  const flippedOnce: PieceShape<number> = [
    [3, 2, 1],
    [6, 5, 4],
  ];
  const flippedAndRotated: PieceShape<number> = [
    [6, 3],
    [5, 2],
    [4, 1],
  ];
  it("handles the base case correctly", () => {
    expect(getRotatedPiece(basePiece, 0, 0)).toEqual(basePiece);
  });
  it("handles the rotating case correctly", () => {
    expect(getRotatedPiece(basePiece, 1, 0)).toEqual(rotatedOnce);
  });
  it("handles the flipping case correctly", () => {
    expect(getRotatedPiece(basePiece, 0, 1)).toEqual(flippedOnce);
  });
  it("handles a combination of flipping and rotating", () => {
    expect(getRotatedPiece(basePiece, 1, 1)).toEqual(flippedAndRotated);
  });
  it("returns a diff reference", () => {
    expect(getRotatedPiece(basePiece, 1, 0)).not.toBe(basePiece);
  });
  it("doesn't mutate the input", () => {
    const basePieceCopy = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    getRotatedPiece(basePiece, 1, 1);
    expect(basePiece).toEqual(basePieceCopy);
  });
});
