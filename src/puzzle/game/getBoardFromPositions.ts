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
  // console.error(
  //   "Gotta generate the Board here & add all the Panel status stuff"
  // );
  // console.log({ gamePieces });

  const panelsWithoutPieces = mapBoard(boardPanels, (panel: Panel) =>
    getPanelWithDetails(panel)
  );

  // step 2: get BoardShape<CellType> of cells covering any board part

  const panelsWithPieces = mapBoard(
    panelsWithoutPieces,
    (panelDetails: PanelDetails): PanelDetails => {
      const cellsCovering = gamePieces.filter(({ position }) => {
        return (
          position?.panelX === panelDetails.panel.panelX &&
          position.panelY === panelDetails.panel.panelY
        );
      });
      if (cellsCovering.length === 0) return panelDetails;

      return {
        ...panelDetails,
        state: "covered",
        coveredBy: cellsCovering[0].position!.cell,
      };
    }
  );

  return panelsWithPieces;
};

export default getBoardFromPositions;
