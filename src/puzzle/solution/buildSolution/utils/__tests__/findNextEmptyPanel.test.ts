import getBoardFromPositions from "../../../../game/getBoardFromPositions";
import { piecesFromPositions } from "../../../../puzzlePieces/piecesFromPositions";
import findNextEmptyPanel from "../findNextEmptyPanel";

describe("findNextEmptyPanel", () => {
  it("returns 0,0 panel if no pieces are placed", () => {
    const board = getBoardFromPositions([]);
    expect(
      findNextEmptyPanel({ board, checkIsChallengeValue: () => false })
    ).toMatchObject({ panelX: 0, panelY: 0 });
  });

  it("returns next empty left-most panel if 0,0 is full", () => {
    const board = getBoardFromPositions(
      piecesFromPositions([{ panelX: 0, panelY: 0, pieceId: 0 }])
    );
    expect(
      findNextEmptyPanel({ board, checkIsChallengeValue: () => false })
    ).toMatchObject({ panelX: 0, panelY: 3 });
  });

  it("returns next empty left-most panel if 0,0 is a challenge value", () => {
    const board = getBoardFromPositions([]);
    expect(
      findNextEmptyPanel({
        board,
        checkIsChallengeValue: (value) => value === "jan",
      })
    ).toMatchObject({ panelX: 0, panelY: 1 });
  });
});
