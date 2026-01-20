import { ChallengeDate } from "../../../context/ChosenDate/types";
import expandPiecePositions, {
  addExtraPiecePositions,
} from "../../game/expandPositions";
import uniqueOrientations from "../../rotations/uniqueOrientations";
import { GamePiece, PositionMap } from "../../types";
import { Solution } from "./types";
import checkBoard from "./utils/checkBoard";
import checkGaps from "./utils/checkGaps";

let steps = 0;
const yieldFunctionDefault =
  typeof window === "undefined"
    ? (resolve: (value: unknown) => void) => setTimeout(resolve, 1000)
    : requestAnimationFrame;

type Options = {
  gamePieces: GamePiece[];
  allowFlipped?: boolean;
  runsAsync?: boolean;
  stepsPerYield?: number;
  yieldFunction?: (callback: (value: unknown) => void) => void;
};

/**
 * Deprecated - favour `buildSolution` instead as it is more efficient
 *
 * Generates a solution for a given date with a given current state of the board
 *
 * @deprecated
 */
const generateSolution = async (
  challengeDate: Pick<
    ChallengeDate,
    "checkIsChallengeValue" | "dayName" | "month" | "dayNumber"
  >,
  options: Options
): Promise<Solution | null> => {
  const { dayName, dayNumber, month, checkIsChallengeValue } = challengeDate;
  const {
    gamePieces, // needs to be full for e.g. filtering, adding next piece, etc
    allowFlipped = true,
    runsAsync = true,
    stepsPerYield = 1000,
    yieldFunction = yieldFunctionDefault,
  }: Options = options;

  if (runsAsync) {
    steps++;
    if (steps % stepsPerYield === 0) await new Promise(yieldFunction);
  }

  const { success, fails, impossible } = {
    ...checkBoard({
      gamePieces,
      checkIsChallengeValue,
    }),
    ...checkGaps({
      gamePieces,
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

  const nextPieceToPlace = gamePieces?.find(
    ({ position = null }) => position === null
  );

  if (nextPieceToPlace === undefined) {
    return success
      ? {
          dayName,
          dayNumber,
          month,
          pieces: gamePieces,
        }
      : null;
  }

  /*  -------- LOGS --------  */
  // const placedPieceCount = gamePieces.filter(({ position }) => position).length;
  // if (placedPieceCount <= 3) {
  //   const board = getBoardFromPositions(gamePieces);
  //   visualiseBoard(board);
  // }
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
            gamePieces,
            positionMap,
          });

          const possiblySolution = await generateSolution(challengeDate, {
            allowFlipped,
            gamePieces: newPlacedPieces,
          });

          if (possiblySolution) return possiblySolution;
        }
      }
    }
  }

  return null;
};

export default generateSolution;
