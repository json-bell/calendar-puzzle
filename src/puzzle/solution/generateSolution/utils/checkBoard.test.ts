import getBoardFromPositions from "../../../game/getBoardFromPositions";
import puzzlePieces from "../../../puzzlePieces";
import { GamePiece } from "../../../types";
import logBoard from "../../../utils/logBoard";
import checkBoard from "./checkBoard";

const gamePieces: GamePiece[] = puzzlePieces.map((piece) => ({
  piece,
  position: null,
}));

const piecesFromPosition = (
  coords: (
    | [number, number]
    | [number, number, 0 | 1 | 2 | 3 | undefined, 0 | 1 | undefined]
  )[]
): GamePiece[] => {
  return gamePieces.map(
    ({ piece }, index): GamePiece => ({
      piece,
      position: coords[index]
        ? {
            cell: { cellSlug: "", cellX: 0, cellY: 0, pieceId: piece.pieceId },
            panelX: coords[index][0] ?? 0,
            panelY: coords[index][1] ?? 0,
            rotation: coords[index][2] ?? 0,
            flipped: coords[index][3] ?? 0,
          }
        : null,
    })
  );
};

describe("checkBoard", () => {
  it("returns possible for empty board", () => {
    expect(
      checkBoard({ checkIsChallengeValue: () => false, gamePieces })
    ).toEqual({
      possible: expect.any(String),
    });
  });

  it("says impossible if pieces are overlapping", () => {
    const gamePieces = piecesFromPosition([
      [0, 0],
      [0, 0],
    ]);
    expect(
      checkBoard({ checkIsChallengeValue: () => false, gamePieces })
    ).toEqual({ impossible: "overlap" });
  });
  it("says impossible if pieces are going over the edge", () => {
    const gamePieces = piecesFromPosition([[5, 5]]);
    logBoard(getBoardFromPositions(gamePieces));
    expect(
      checkBoard({ checkIsChallengeValue: () => false, gamePieces })
    ).toEqual({ impossible: "outside-2" });
  });
  it("says impossible if pieces are going over the edge", () => {
    const gamePieces = piecesFromPosition([[0, 0, 1, 0]]);
    expect(
      checkBoard({ checkIsChallengeValue: () => false, gamePieces })
    ).toEqual({ impossible: "outside-2" });
  });
  it("says impossible if pieces are going over the edge", () => {
    const gamePieces = piecesFromPosition([
      [5, 3],
      [0, 0, 2, 0],
    ]);
    expect(
      checkBoard({ checkIsChallengeValue: () => false, gamePieces })
    ).toEqual({ impossible: "outside-4" });
  });
  it("detects a completely outside piece from rotation", () => {
    const gamePieces = piecesFromPosition([
      [0, 2, 0, 0],
      [1, 3, 0, 0],
      [1, 0, 3, 1],
      [5, 0, 0, 0],
      [0, 0, 1, 1], // outside by being rotated & flipped
    ]);

    expect(
      checkBoard({ checkIsChallengeValue: () => false, gamePieces })
    ).toEqual({
      impossible: "outside-5",
    });
  });
  it("detects a completely out piece from positioning", () => {
    const gamePieces = piecesFromPosition([[6, 6]]);

    expect(
      checkBoard({ checkIsChallengeValue: () => false, gamePieces })
    ).toEqual({
      impossible: "outside-5",
    });
  });
});
