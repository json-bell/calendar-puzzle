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

type BoardCoverage = BoardShape<CellType[]>;

const addPieceCoverageToBoard = (
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
  rotatedPiece.forEach((pieceRow, YinShape) =>
    pieceRow.forEach((isCovered, XinShape) => {
      if (!isCovered) return;
      const coveringCell = {
        cellX: XinShape,
        cellY: YinShape,
        pieceId: cell.pieceId,
      };
      console.log("placing cell:", coveringCell);
      board[YinShape + pieceCoords.y][XinShape + pieceCoords.x].push({
        ...coveringCell,
        cellSlug: getCellSlug(coveringCell),
      });
      console.log(board[0]);
    })
  );
  return board;
};

export const getBoardCoverage = (
  gamePieces: Game["gamePieces"],
  boardPanels: BoardShape<Panel>
): BoardCoverage => {
  const emptyBoard: BoardCoverage = mapBoard(boardPanels, () => []);

  const coveredBoard = gamePieces.reduce(addPieceCoverageToBoard, emptyBoard);

  return coveredBoard;
};

export const getBoardFromPositions = (
  gamePieces: Game["gamePieces"]
): Game["board"] => {
  // console.log({ gamePieces });

  const panelsWithoutPieces = mapBoard(boardPanels, (panel: Panel) =>
    getPanelWithDetails(panel)
  );

  // step 2: get BoardShape<CellType> of cells covering any board part
  const boardCoverage = getBoardCoverage(gamePieces, boardPanels);
  const addCoverageToPanels: BoardMapperFn<PanelDetails, PanelDetails> = (
    panelDetails,
    rowIndex,
    colIndex
  ) => {
    const coveringCellArray = boardCoverage[colIndex][rowIndex];
    if (coveringCellArray.length === 0) return panelDetails;
    return {
      ...panelDetails,
      state: "covered",
      coveredBy: coveringCellArray[0],
    };
  };

  // step 3: apply coverage to covered board cells
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
