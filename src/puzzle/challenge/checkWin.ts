import { PanelContent } from "../panelTypes";
import { Board } from "../types";

type CheckWinParams = {
  board: Board;
  checkIsChallengeValue?: (value: PanelContent) => boolean;
};

const checkWin = ({
  board,
  checkIsChallengeValue,
}: CheckWinParams): boolean => {
  if (!checkIsChallengeValue) {
    console.error("checked for win without checkIsChallengeValue");
    return false;
  }

  const failsChallenge = board.flat().some(({ coveringCells, panel }) => {
    // should satisfy one of:
    if (coveringCells.length > 0) return false; // being covered
    if (checkIsChallengeValue(panel.content)) return false; // being a challenge cell
    if (panel.content === "wall") return false; // being a wall
    // else fails
    return true;
  });

  return !failsChallenge;
};

export default checkWin;
