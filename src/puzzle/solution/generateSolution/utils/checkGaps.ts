import getBoardFromPositions from "../../../game/getBoardFromPositions";
import { PanelContent } from "../../../panelTypes";
import { GamePiece } from "../../../types";
import mapBoard from "../../../utils/mapBoard";
import { CheckOutput } from "./checkBoard";
import findBoardComponents from "./findBoardComponents";

const gap = "gap";
const notGap = null;
type BoardGap = typeof gap | typeof notGap;

const checkGaps = ({
  checkIsChallengeValue,
  gamePieces,
}: {
  gamePieces: GamePiece[];
  checkIsChallengeValue: (value: PanelContent) => boolean;
}): CheckOutput => {
  const board = getBoardFromPositions(gamePieces);

  const boardGaps = mapBoard(board, ({ panel, coveringCells }): BoardGap => {
    const isChallengeValue = checkIsChallengeValue(panel.content);
    if (isChallengeValue) return notGap;
    if (coveringCells.length > 0) return notGap;
    if (panel.content === "wall") return notGap;
    return gap;
  });

  const relatedGaps = findBoardComponents(boardGaps);

  const flatGapIds = relatedGaps.flat();

  const counts: Record<number, number> = {};

  for (const item of flatGapIds) {
    if (item) counts[item] = (counts[item] || 0) + 1;
  }

  const wrongGaps = Object.values(counts).filter((gapSize) => gapSize % 5);
  if (wrongGaps.length)
    return { impossible: `wrong-gaps-${wrongGaps.join("-")}` };
  return { possible: "gaps-alright" };
};

export default checkGaps;
