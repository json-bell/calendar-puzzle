import { ChallengeDate } from "../../../context/ChosenDate/types";
import expandPiecePositions, {
  addExtraPiecePositions,
} from "../../game/expandPositions";
import getBoardFromPositions from "../../game/getBoardFromPositions";
import uniqueOrientations from "../../rotations/uniqueOrientations";
import { GamePiece, PositionMap } from "../../types";
import logBoard from "../../utils/logBoard";
import { Solution } from "./types";
import checkBoard from "./utils/checkBoard";
import checkGaps from "./utils/checkGaps";

/**
 * Generates a solution for a given date with a given current state of the board
 *
 */
const generateSolution = (
  challengeDate: Pick<
    ChallengeDate,
    "checkIsChallengeValue" | "dayName" | "month" | "dayNumber"
  >,
  options: {
    currentlyPlacedPieces: GamePiece[];
    allowFlipped?: boolean;
  }
): Solution | null => {
  const { dayName, dayNumber, month, checkIsChallengeValue } = challengeDate;
  const { currentlyPlacedPieces = [], allowFlipped = true } = options || {};

  const { success, fails, impossible } = {
    ...checkBoard({
      gamePieces: currentlyPlacedPieces,
      checkIsChallengeValue,
    }),
    ...checkGaps({
      gamePieces: currentlyPlacedPieces,
      checkIsChallengeValue,
    }),
  };

  if (fails || impossible) return null;

  // ADD CHECK: IF SPACE SIZE === 5, check specifically for pieces that fill that space
  // OR more generally, choose SMALLEST GAP,
  // FIX A CELL IN THAT GAP
  // and only CHOOSE CELLS THAT FILL THAT GAP
  // -> Maybe needs a different structure than for x in 0 to 9, y in 0 to 6
  // like we can have a delta-x & delta-y or summat depending on the piece
  // Ooo which actually we can get directly from `pieceShape`!

  // OOOOOOOR
  // TRY TO FILL THE SMALLEST GAPS FIRST!
  // So if e.g. there's 10 20 25 or summat
  // it FIRST only proceeds when the gap of 10 is shrunk!!!!

  // GAP STORAGE -> KEEP TRACK OF TOP-LEFT-MOST cell
  // -> instead of `id++`, have a push to an array with {id: 1, firstVisit: {x: 1, y: 3}} or summat

  const nextPieceToPlace = currentlyPlacedPieces?.find(
    ({ position = null }) => position === null
  );

  if (nextPieceToPlace === undefined) {
    return success
      ? {
          dayName,
          dayNumber,
          month,
          pieces: currentlyPlacedPieces,
        }
      : null;
  }

  /*  -------- LOGS --------  */
  const placedPieceCount = currentlyPlacedPieces.filter(
    ({ position }) => position
  ).length;
  if (placedPieceCount <= 3) {
    const board = getBoardFromPositions(currentlyPlacedPieces);
    logBoard(board);
  }
  /*  -------- LOGS END --------  */

  // else: we place the nextIdToPlace
  const pieceId = nextPieceToPlace.piece.pieceId;
  const { uniqueFlips, uniqueRotations } = uniqueOrientations[pieceId];

  const rotations = ([0, 1, 2, 3] as const).filter(
    (rotation) => rotation < uniqueRotations
  );
  const flips =
    allowFlipped && uniqueFlips === 2 ? ([0, 1] as const) : ([0] as const);

  for (let panelX = 0; panelX < 9; panelX++) {
    for (let panelY = 0; panelY < 6; panelY++) {
      for (const rotation of rotations) {
        for (const flipped of flips) {
          const positionMap: PositionMap = expandPiecePositions([
            {
              pieceId,
              panelX,
              panelY,
              rotation,
              flipped,
            },
          ]);

          const newPlacedPieces: GamePiece[] = addExtraPiecePositions({
            gamePieces: currentlyPlacedPieces,
            positionMap,
          });

          const possiblySolution = generateSolution(challengeDate, {
            allowFlipped,
            currentlyPlacedPieces: newPlacedPieces,
          });

          if (possiblySolution) return possiblySolution;
        }
      }
    }
  }

  return null;
};

export default generateSolution;

// logic:
// for i in 0 to 9
// if piece(i) placed, continue to i + 1
// else: for every possible position of piece i, attempt solution for remaining pieces
// -> if successful, return solution
// -> if unsuccessful, attempt next place of piece i

// ---->
// find (first unplaced piece: piece N)
// if (there exists unplaced N) {
// for (every X)
// for (every Y)
// for (every rotation)
// for (every flip) {
// check no overlap with new position
// const solution = generateSolution({ ...placedPieces, N: newPosition })
// if (solution) return solution
// }
// return null
// }
// else
// // all pieces placed
// checkWin(Position) & return it
