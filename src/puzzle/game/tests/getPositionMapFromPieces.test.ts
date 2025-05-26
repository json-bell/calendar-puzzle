import puzzlePieces from "../../puzzlePieces";
import { GamePiece, PiecePosition } from "../../types";
import { addExtraPiecePositions } from "../expandPositions";
import getPositionMapFromPieces from "../getPositionMapFromPieces";

const gamePieces = puzzlePieces.map(
  (piece): GamePiece => ({ piece, position: null })
);

describe("getPositionMapFromPieces", () => {
  it("returns an empty object for no piece positions", () => {
    expect(getPositionMapFromPieces(gamePieces)).toEqual({});
  });
  it("finds the positions of specific elements when provided", () => {
    const fullGamePieces = addExtraPiecePositions({
      gamePieces,
      positionMap: {
        1: `position-1` as unknown as PiecePosition,
        3: `position-3` as unknown as PiecePosition,
      },
    });
    expect(getPositionMapFromPieces(fullGamePieces)).toEqual({
      1: `position-1`,
      3: `position-3`,
    });
  });

  it("returns an empty object for an empty array", () => {
    expect(getPositionMapFromPieces([])).toEqual({});
  });
});
