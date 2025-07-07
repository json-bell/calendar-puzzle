import { PanelContent } from "../../../panelTypes";
import { Board } from "../../../types";

const findNextEmptyPanel = ({
  board,
  checkIsChallengeValue,
}: {
  board: Board;
  checkIsChallengeValue: (value: PanelContent) => boolean;
}): { panelX: number; panelY: number } | null => {
  const flatBoard = board
    .flat()
    .sort(({ panel: panelA }, { panel: panelB }) => {
      const xDiff = panelA.panelX - panelB.panelX;
      if (xDiff !== 0) return xDiff;
      const yDiff = panelA.panelY - panelB.panelY;
      return yDiff;
    });
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
