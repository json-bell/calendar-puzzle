import { ChallengeDate } from "../../../context/ChosenDate/types";
import expandPiecePositions, {
  addExtraPiecePositions,
} from "../../game/expandPositions";
import getBoardFromPositions from "../../game/getBoardFromPositions";
import uniqueOrientations from "../../rotations/uniqueOrientations";
import { GamePiece, PositionMap } from "../../types";
import checkBoard from "../generateSolution/utils/checkBoard";
import checkGaps from "../generateSolution/utils/checkGaps";
import { Solution } from "./types";
import findNextEmptyPanel from "./utils/findNextEmptyPanel";

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
 * Generates a solution for a given date with a given current state of the board
 *
 * This function uses a panel-first approach: it figures out what panel will be hardest (from being in the smallest gap)
 * and starts with that, then uses top-left priority.
 *
 */
const buildSolution = async (
  challengeDate: Pick<
    ChallengeDate,
    "checkIsChallengeValue" | "dayName" | "month" | "dayNumber"
  >,
  options: Options
): Promise<Solution | null> => {
  const { dayName, dayNumber, month, checkIsChallengeValue } = challengeDate;
  const {
    gamePieces, // needs to be full for e.g. figuring out which piece to place
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

  const board = getBoardFromPositions(gamePieces);
  const nextPanelToPlace = findNextEmptyPanel({ board, checkIsChallengeValue });

  if (!nextPanelToPlace) {
    return success
      ? {
          dayName,
          dayNumber,
          month,
          pieces: gamePieces,
        }
      : null;
  }

  const { panelX, panelY } = nextPanelToPlace;
  const placeablePieces = gamePieces.filter(
    ({ position = null }) => position === null
  );

  /*  -------- LOGS --------  */
  // const placedPieceCount = gamePieces.filter(({ position }) => position).length;
  // if (placedPieceCount <= 4) {
  //   const board = getBoardFromPositions(gamePieces);
  //   visualiseBoard(board);
  // }
  /*  -------- LOGS END --------  */

  for (const newPiece of placeablePieces) {
    const pieceId = newPiece.piece.pieceId;
    const cells = newPiece.piece.shape
      .flat()
      .filter((cellPresence) => cellPresence !== null);

    const { uniqueFlips, uniqueRotations } = uniqueOrientations[pieceId];
    const rotations = ([0, 1, 2, 3] as const).filter(
      (rotation) => rotation < uniqueRotations
    );
    const flips =
      allowFlipped && uniqueFlips === 2 ? ([0, 1] as const) : ([0] as const);

    for (const rotation of rotations) {
      for (const flipped of flips) {
        for (const cell of cells) {
          const positionMap: PositionMap = expandPiecePositions([
            {
              pieceId,
              panelX,
              panelY,
              cell,
              rotation,
              flipped,
            },
          ]);

          const newPlacedPieces: GamePiece[] = addExtraPiecePositions({
            gamePieces,
            positionMap,
          });

          const possiblySolution = await buildSolution(challengeDate, {
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

export default buildSolution;
