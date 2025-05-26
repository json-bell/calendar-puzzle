import { PanelContent } from "../../../panelTypes";
import { Board } from "../../../types";

const findNextEmptyPanel = ({
  board,
  checkIsChallengeValue,
}: {
  board: Board;
  checkIsChallengeValue: (value: PanelContent) => boolean;
}): { panelX: number; panelY: number } | null => {
  const flatBoard = board.flat();
  const emptyPanel = flatBoard.find(({ coveringCells, panel, state }) => {
    if (coveringCells.length >= 1) return false;
    if (checkIsChallengeValue(panel.content)) return false;
    if (state === "wall") return false;
    return true;
  });
  if (!emptyPanel) return null;

  return emptyPanel.panel;
};

export default findNextEmptyPanel;
