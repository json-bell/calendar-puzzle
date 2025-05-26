import expandPiecePositions, {
  addExtraPiecePositions,
  MinimalPosition,
} from "../../../../game/expandPositions";
import { PanelContent } from "../../../../panelTypes";
import puzzlePieces from "../../../../puzzlePieces";
import { GamePiece } from "../../../../types";
import checkGaps from "../checkGaps";

const baseGamePieces: GamePiece[] = puzzlePieces.map((piece) => ({
  piece,
  position: null,
}));
const checkSun14Dec = (value: PanelContent) => {
  if (value === "sun" || value === "dec" || value === 14) return true;
  return false;
};
const piecesFromPositions = (
  minimalPositions: MinimalPosition[]
): GamePiece[] => {
  const positionMap = expandPiecePositions(minimalPositions);
  const gamePieces = addExtraPiecePositions({
    gamePieces: baseGamePieces,
    positionMap,
  });
  return gamePieces;
};

describe("checkGaps", () => {
  it("finds gaps that are too small", () => {
    const gamePieces = piecesFromPositions([
      { pieceId: 0, panelX: 0, panelY: 2 },
      { pieceId: 1, panelX: 1, panelY: 3 },
      { pieceId: 2, panelX: 1, panelY: 0, rotation: 3, flipped: 1 },
    ]);
    expect(
      checkGaps({ checkIsChallengeValue: checkSun14Dec, gamePieces })
    ).toEqual({
      impossible: "wrong-gaps-2-3",
    });
  });
  it("allows empty board", () => {
    const gamePieces = piecesFromPositions([]);
    expect(
      checkGaps({ checkIsChallengeValue: checkSun14Dec, gamePieces })
    ).toMatchObject({
      possible: expect.any(String),
    });
  });
  it("allows possible gaps", () => {
    const gamePieces = piecesFromPositions([
      { pieceId: 0, panelX: 0, panelY: 0 },
      { pieceId: 1, panelX: 3, panelY: 6 },
    ]);
    expect(
      checkGaps({ checkIsChallengeValue: checkSun14Dec, gamePieces })
    ).toMatchObject({
      possible: expect.any(String),
    });
  });
  // it.only("counts gap sizes", () => {
  //   const gamePieces = piecesFromPositions([
  //     { pieceId: 0, panelX: 0, panelY: 0 },
  //     { pieceId: 1, panelX: 3, panelY: 0 },
  //     { pieceId: 2, panelX: 1, panelY: 3, rotation: 3 },
  //   ]);
  //   visualiseBoard(getBoardFromPositions(gamePieces));

  //   expect(
  //     checkGaps({ checkIsChallengeValue: checkSun14Dec, gamePieces })
  //   ).toEqual({
  //     possible: expect.any(String),
  //     gaps: [],
  //   });
  // });
});
