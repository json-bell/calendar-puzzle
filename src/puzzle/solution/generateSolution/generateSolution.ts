import {
  ChallengeDate,
  ChallengeGoal,
} from "../../../context/ChosenDate/types";
import { Solution } from "./types";

/**
 * Generates a solution for a given date with a given current state of the board
 *
 */
const generateSolution = (
  { dayName, dayNumber, month, checkIsChallengeValue }: ChallengeDate,
  options?: {
    currentlyPlacedPieces?: Partial<Solution["piecePositions"]>;
  }
): Solution | null => {
  return {
    dayName,
    dayNumber,
    month,
    piecePositions: {},
  };
};

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
