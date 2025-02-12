import boardPanels from "../boardPanels";
import { Panel, PanelDetails, PanelStatus } from "../panelTypes";
import { Game } from "../types";
import mapBoard from "../utils/mapBoard";

const getPanelWithDetails = (panel: Panel): PanelDetails => {
  if (panel.type === "wall") return { panel, state: "wall" };
  const state: PanelStatus = "free";
  return { panel, state };
};

export const getBoardFromPositions = (
  gamePieces: Game["gamePieces"]
): Game["board"] => {
  console.error(
    "Gotta generate the Board here & add all the Panel status stuff"
  );
  console.log({ gamePieces });

  const panelsWithoutPieces = mapBoard(boardPanels, (panel: Panel) =>
    getPanelWithDetails(panel)
  );

  return panelsWithoutPieces;
};

export default getBoardFromPositions;
