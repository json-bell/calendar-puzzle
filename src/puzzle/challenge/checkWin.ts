import { PanelContent } from "../panelTypes";
import { Board, GamePiece } from "../types";
import countFlips from "./countFlips";
import { WinDetails } from "./types";

type CheckWinParams = {
  board: Board;
  gamePieces: GamePiece[];
  checkIsChallengeValue: (value: PanelContent) => boolean;
};

// we have several things to affect this:
// - all pieces are upright
// - solves without hints
// - could have a 'check' function? If the solution is flexible enough to solve from partial solutions,
// which I imagine it will be (since it'll probably be implemented recursively anyway)

const checkWin = ({
  board,
  gamePieces,
  checkIsChallengeValue,
}: CheckWinParams): WinDetails => {
  if (!checkIsChallengeValue) {
    console.error("checked for win without checkIsChallengeValue");
    return { isWin: false };
  }

  const failsChallenge = board.flat().some(({ coveringCells, panel }) => {
    // should satisfy one of:
    if (coveringCells.length > 0) return false; // being covered
    if (checkIsChallengeValue(panel.content)) return false; // being a challenge cell
    if (panel.content === "wall") return false; // being a wall
    // else fails
    return true;
  });
  if (failsChallenge) return { isWin: false };

  const flippedPieceCount = countFlips(gamePieces);

  return {
    isWin: true,
    flippedPieceCount,
  };
};

export default checkWin;
