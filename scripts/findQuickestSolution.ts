import { ChallengeDate } from "../src/context/ChosenDate/types";
import { PanelContent } from "../src/puzzle/panelTypes";
import { piecesFromPositions } from "../src/puzzle/puzzlePieces/piecesFromPositions";
import generateSolution from "../src/puzzle/solution/generateSolution/generateSolution";
import visualiseBoard from "../src/puzzle/utils/visualiseBoard";
import getBoardFromPositions from "../src/puzzle/game/getBoardFromPositions";
import { PiecePosition } from "../src/puzzle/types";
import {
  dayNames,
  dayNumbers,
  months,
} from "../src/puzzle/boardPanels/dateData";
// import fs, { promises } from "fs";
// import path from "path";

const gamePieces = piecesFromPositions([]);
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

// const {
//   dayNames,
//   dayNumbers,
//   months,
// }: {
//   dayNames: readonly DayName[];
//   dayNumbers: readonly DayNumber[];
//   months: readonly Month[];
// } = true
//   ? dateData
//   : {
//       dayNames: ["sun", "fri"],
//       dayNumbers: [17, 22],
//       months: ["jul", "aug"],
//     };

const allChallengeDates = dayNames
  .map((dayName) =>
    dayNumbers.map((dayNumber) =>
      months.map((month) => ({
        dayName,
        dayNumber,
        month,
      }))
    )
  )
  .flat()
  .flat();

let solvedNumber = 0;
// const dir = "temp";
// fs.mkdirSync(dir, { recursive: true });
// const filePath = path.join(dir, "solutions.log");
// const stream = fs.createWriteStream(filePath, { flags: "a" });
// stream.write(
//   `Collecting solutions - timestamp ${new Date(Date.now()).toISOString()}\n`
// );

const promisesArr = allChallengeDates.map(({ dayName, dayNumber, month }) => {
  const promise = generateSolution(
    createChallengeDate(dayName, dayNumber, month),
    {
      gamePieces,
    }
  );
  return { dayName, dayNumber, month, promise };
});

promisesArr.forEach(async ({ dayName, dayNumber, month, promise }) => {
  const solution = await promise;
  if (solvedNumber >= 6) return;
  solvedNumber++;
  if (!solution) return;
  // stream.write
  console.log(
    `Solution #${solvedNumber} for ${dayName}-${dayNumber}-${month}\n`
  );

  const boardStr = visualiseBoard(
    getBoardFromPositions(solution.pieces),
    "string"
  );
  // stream.write
  console.log(boardStr + "\n");

  const positions = solution.pieces
    .map(({ position }) => position as PiecePosition)
    .map(({ panelX, panelY, rotation, flipped }) => ({
      panelX,
      panelY,
      rotation,
      flipped,
    }));
  // stream.write
  console.log(JSON.stringify(positions) + "\n\n");
});
