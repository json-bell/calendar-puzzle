import getBoardFromPositions from "../../../game/getBoardFromPositions";
import { PanelContent } from "../../../panelTypes";
import { pieceIds } from "../../../puzzlePieces/pieceIds";
import { GamePiece } from "../../../types";

export type CheckOutput =
  | { impossible: string; possible?: never; fails?: never; success?: never }
  | { impossible?: never; possible: string; fails?: never; success?: never }
  | { impossible?: never; possible?: never; fails: string; success?: never }
  | { impossible?: never; possible?: never; fails?: never; success: string };

/**
 * Confirms piece placement isn't against a solution layout
 */
const checkBoard = ({
  checkIsChallengeValue,
  gamePieces,
}: {
  gamePieces: GamePiece[];
  checkIsChallengeValue: (value: PanelContent) => boolean;
}): CheckOutput => {
  const flatBoard = getBoardFromPositions(gamePieces).flat();

  for (const { coveringCells, panel } of flatBoard) {
    const coverCount = coveringCells.length;
    if (coverCount >= 2) return { impossible: "overlap" };
    if (panel.content === "wall" && coverCount >= 1)
      return { impossible: "covered-wall" };
    if (coverCount >= 1 && checkIsChallengeValue(panel.content))
      return { impossible: `covered-challenge-${panel.content}` };
  }

  for (const pieceId of pieceIds) {
    if (!gamePieces[pieceId].position) continue;
    const cellCount = flatBoard.filter(({ coveringCells }) => {
      return coveringCells.map(({ pieceId }) => pieceId).includes(pieceId);
    }).length;
    if (!(cellCount === 5)) return { impossible: `outside-${5 - cellCount}` };
  }

  if (gamePieces.filter(({ position }) => position).length < 10)
    return { possible: "needs-more-pieces" };

  const failsChallenge = flatBoard.some(({ coveringCells, panel }) => {
    // early returns for successful paths
    if (coveringCells.length === 1) return false; // being covered
    if (checkIsChallengeValue(panel.content)) return false; // being a challenge cell
    if (panel.content === "wall") return false; // being a wall
    // else fails
    return true;
  });

  if (failsChallenge)
    return { fails: "board has uncovered non-wall non-challenge" };

  return { success: "solution-found" };
};

export default checkBoard;
