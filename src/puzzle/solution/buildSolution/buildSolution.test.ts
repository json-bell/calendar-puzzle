import { ChallengeDate } from "../../../context/ChosenDate/types";
import { MinimalPosition } from "../../game/expandPositions";
import getBoardFromPositions from "../../game/getBoardFromPositions";
import { PanelContent } from "../../panelTypes";
import { piecesFromPositions } from "../../puzzlePieces/piecesFromPositions";
import visualiseBoard from "../../utils/visualiseBoard";
import generateSolution from "../generateSolution/generateSolution";
import buildSolution from "./buildSolution";

const createChallengeDate = (
  dayName: ChallengeDate["dayName"],
  dayNumber: ChallengeDate["dayNumber"],
  month: ChallengeDate["month"]
): Parameters<typeof generateSolution>[0] => {
  const checkIsChallengeValue = (value: PanelContent) => {
    if (value === dayName || value === dayNumber || value === month)
      return true;
    return false;
  };

  return {
    dayName,
    dayNumber,
    month,
    checkIsChallengeValue,
  };
};

describe("buildSolution", () => {
  it("builds a full solution", async () => {
    const gamePieces = piecesFromPositions([]);
    const solution = await buildSolution(
      createChallengeDate("wed", 22, "jan"),
      {
        runsAsync: false,
        gamePieces,
        allowFlipped: false,
      }
    );
    expect(solution).not.toBeNull();

    const expectedSolution = [
      [" ", "3", "3", "3", "3", "3", "5", "5", "5"],
      ["0", "0", "0", "4", "4", "5", "5", " ", "7"],
      ["0", "8", "8", "8", "4", "1", "1", "1", "7"],
      ["0", "8", "8", "6", "4", "4", "1", "7", "7"],
      ["2", " ", "6", "6", "6", "9", "1", "9", "7"],
      ["2", "2", "2", "2", "6", "9", "9", "9", "W"],
    ];
    const board = getBoardFromPositions(solution?.pieces || []);
    expect(visualiseBoard(board, "array")).toEqual(expectedSolution);
  }, 10000);
  it("finishes a partial solution", async () => {
    const minimalPositions: MinimalPosition[] = [
      { pieceId: 0, rotation: 0, flipped: 0, panelX: 2, panelY: 0 },
      { pieceId: 1, panelX: 8, panelY: 0, rotation: 1, flipped: 0 },
      { pieceId: 3, panelX: 4, panelY: 5, rotation: 1, flipped: 0 },
      { pieceId: 5, panelX: 4, panelY: 1, rotation: 3, flipped: 0 },
      { pieceId: 8, panelX: 0, panelY: 3, rotation: 0, flipped: 0 },
      { pieceId: 9, rotation: 1, flipped: 0, panelX: 1, panelY: 0 },
    ];
    const gamePieces = piecesFromPositions(minimalPositions);

    const solution = await generateSolution(
      createChallengeDate("sun", 25, "may"),
      {
        runsAsync: false,
        gamePieces,
        allowFlipped: false,
      }
    );
    expect(solution).not.toBeNull();
    if (solution === null) throw new Error("Idk why line above didn't stop it");

    const board = getBoardFromPositions(solution.pieces);

    const expectedBoard = [
      ["9", "9", "0", "0", "0", "5", "5", "5", "1"],
      [" ", "9", "0", "2", "5", "5", "1", "1", "1"],
      ["9", "9", "0", "2", "7", "7", "7", "7", "1"],
      ["8", "8", "8", "2", "4", "4", "7", "6", "6"],
      ["8", "8", "2", "2", " ", "4", "6", "6", " "],
      ["3", "3", "3", "3", "3", "4", "4", "6", "W"],
    ];

    expect(visualiseBoard(board, "array")).toEqual(expectedBoard);
  });
});
