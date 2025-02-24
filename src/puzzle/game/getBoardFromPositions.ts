import boardPanels from "../boardPanels";
import getCellSlug from "../cell/getCellSlug";
import { Panel, PanelDetails, PanelStatus } from "../panelTypes";
import { CellType } from "../pieceTypes";
import { BoardShape, Game, GamePiece } from "../types";
import mapBoard, { BoardMapperFn } from "../utils/mapBoard";

const getPanelWithDetails = (panel: Panel): PanelDetails => {
  if (panel.type === "wall") return { panel, state: "wall" };
  const state: PanelStatus = "free";
  return { panel, state };
};

export const getPiecelessBoard: () => BoardShape<PanelDetails> = () =>
  mapBoard(boardPanels, (panel: Panel) => getPanelWithDetails(panel));

export type BoardCoverage = BoardShape<CellType[]>;

export const addPieceCoverageToBoard = (
  board: BoardCoverage,
  gamePiece: GamePiece
): BoardCoverage => {
  if (!gamePiece.position) return board;
  // else piece is placed
  const { shape: pieceShape } = gamePiece.piece;
  const { cell, panelX, panelY, rotation } = gamePiece.position;

  const rotatedPiece = pieceShape;
  const pieceCoords = { x: panelX - cell.cellX, y: panelY - cell.cellY };
  if (rotation !== 0) {
    throw new Error(
      "Piece rotation is not supported in generating board from piece positions"
    );
  }
  const outputBoard = mapBoard(board, (cellArr) => [...cellArr]);
  // ISSUE: MAKE SECTION PURE WITH REDUCER
  rotatedPiece.forEach((pieceRow, YinShape) =>
    pieceRow.forEach((isCovered, XinShape) => {
      if (!isCovered) return;
      const coveredPanelY = YinShape + pieceCoords.y;
      const coveredPanelX = XinShape + pieceCoords.x;
      if (
        coveredPanelY < 0 ||
        coveredPanelY > 5 ||
        coveredPanelX < 0 ||
        coveredPanelX > 8
      )
        return;
      const coveringCell = {
        cellX: XinShape,
        cellY: YinShape,
        pieceId: cell.pieceId,
      };
      outputBoard[coveredPanelY][coveredPanelX].push({
        ...coveringCell,
        cellSlug: getCellSlug(coveringCell),
      });
    })
  );
  return outputBoard;
};

export const getBoardCoverage = (
  gamePieces: Game["gamePieces"]
): BoardCoverage => {
  const emptyBoard: BoardCoverage = mapBoard(boardPanels, () => []);

  const coveredBoard = gamePieces.reduce(addPieceCoverageToBoard, emptyBoard);

  return coveredBoard;
};

export const getBoardFromPositions = (
  gamePieces: Game["gamePieces"]
): Game["board"] => {
  // step 1: get Board shape with appropriate details
  const panelsWithoutPieces = getPiecelessBoard();

  // step 2: get BoardShape<CellType> of cells covering any board part
  const boardCoverage = getBoardCoverage(gamePieces);

  // step 3: apply coverage to covered board cells
  const addCoverageToPanels: BoardMapperFn<PanelDetails, PanelDetails> = (
    panelDetails,
    rowIndex,
    colIndex
  ) => {
    const coveringCellArray = boardCoverage[colIndex][rowIndex];
    if (coveringCellArray.length === 0) return panelDetails;
    if (panelDetails.state === "wall") return panelDetails;
    return {
      ...panelDetails,
      state: "covered",
      coveredBy: coveringCellArray[0],
    };
  };

  const panelWithPieces = mapBoard(panelsWithoutPieces, addCoverageToPanels);
  return panelWithPieces;

  const panelsWithPlacedPositionCovered = mapBoard(
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

  return panelsWithPlacedPositionCovered;
};

export default getBoardFromPositions;
