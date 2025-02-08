import boardPanels from "../boardPanels";
import { Panel, PanelDetails, PanelStatus } from "../panelTypes";
import { BoardRow, BoardShape, Game } from "../types";

const getPanelWithDetails = (panel: Panel): PanelDetails => {
  if (panel.type === "wall") return { panel, state: "wall" };
  const state: PanelStatus = "free";
  return { panel, state };
};

export const getBoardFromPositions = (
  piecePositions: Game["piecePositions"]
): Game["board"] => {
  console.error(
    "Gotta generate the Board here & add all the Panel status stuff"
  );
  console.log({ piecePositions });
  return boardPanels.map(
    (panelRow) =>
      panelRow.map((panel) =>
        getPanelWithDetails(panel)
      ) as BoardRow<PanelDetails>
  ) as BoardShape<PanelDetails>;
};

export default getBoardFromPositions;
