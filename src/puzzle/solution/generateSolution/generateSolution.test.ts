import { ChallengeDate } from "../../../context/ChosenDate/types";
import { MinimalPosition } from "../../game/expandPositions";
import getBoardFromPositions from "../../game/getBoardFromPositions";
import { PanelContent } from "../../panelTypes";
import { piecesFromPositions } from "../../puzzlePieces/piecesFromPositions";
import visualiseBoard from "../../utils/visualiseBoard";
import generateSolution from "./generateSolution";

const getChallengeDate = (
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

describe("generateSolution", () => {
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
    visualiseBoard(getBoardFromPositions(gamePieces));

    const solution = await generateSolution(
      getChallengeDate("sun", 25, "may"),
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

  // it.skip("generates a solution for", async () => {
  //   const dayName = "sun";
  //   const dayNumber = 25;
  //   const month = "may";
  //   const solution = await generateSolution(
  //     getChallengeDate(dayName, dayNumber, month),
  //     {
  //       gamePieces: piecesFromPositions([]),
  //       allowFlipped: false,
  //     }
  //   );

  //   console.dir(solution?.pieces.map(({ position }) => position));
  //   if (solution) visualiseBoard(getBoardFromPositions(solution.pieces));
  //   throw new Error("WIP");
  // }, 60000);

  it.todo("sad path - failing build for various reasons");
});
