import { ChallengeDate } from "../../../context/ChosenDate/types";
import getCellSlug from "../../cell/getCellSlug";
import getBoardFromPositions from "../../game/getBoardFromPositions";
import { CellType } from "../../pieceTypes";
import puzzlePieces from "../../puzzlePieces";
import uniqueOrientations from "../../rotations/uniqueOrientations";
import { GamePiece } from "../../types";
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

  const nextPieceToPlace = currentlyPlacedPieces?.find(
    ({ position = null }) => position === null
  );

  if (nextPieceToPlace === undefined) {
    return success
      ? {
          dayName,
          dayNumber,
          month,
          piecePositions: currentlyPlacedPieces,
        }
      : null;
  }

  /*  -------- LOGS --------  */
  const placedPieceCount = currentlyPlacedPieces.filter(
    ({ position }) => position
  ).length;
  if (placedPieceCount <= 7) {
    console.log(`looking to place ${nextPieceToPlace.piece.pieceId}`);
    console.log(
      "most recent placed piece position:",
      JSON.stringify(
        currentlyPlacedPieces.map(({ piece, position }) => ({
          pieceId: piece.pieceId,
          position,
        })),
        null,
        2
      )
    );
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

  const cell: CellType = {
    cellX: 0,
    cellY: 0,
    pieceId,
    cellSlug: getCellSlug({ cellX: 0, cellY: 0, pieceId }),
  };

  for (let panelX = 0; panelX < 9; panelX++) {
    for (let panelY = 0; panelY < 6; panelY++) {
      for (const rotation of rotations) {
        for (const flipped of flips) {
          const nextPosition: GamePiece["position"] = {
            panelX,
            panelY,
            rotation,
            flipped,
            cell,
          };

          const newPlacedPieces: GamePiece[] = [...currentlyPlacedPieces];
          newPlacedPieces[pieceId] = {
            position: nextPosition,
            piece: puzzlePieces[pieceId],
          };
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
