import boardPanels from "../boardPanels";
import { Panel, PanelDetails, PanelStatus } from "../panelTypes";
import { CellType } from "../pieceTypes";
import { getRotatedCellCoords } from "../rotations/getRotatedCellCoords";
import getRotatedPiece from "../rotations/getRotatedPiece";
import { BoardShape, Game, GamePiece } from "../types";
import mapBoard, { BoardMapperFn } from "../utils/mapBoard";

const getPanelWithDetails = (panel: Panel): PanelDetails => {
  if (panel.type === "wall") return { panel, state: "wall", coveringCells: [] };
  const state: PanelStatus = "free";
  return { panel, state, coveringCells: [] };
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
  const { piece } = gamePiece;
  const { cell, panelX, panelY, rotation, flipped } = gamePiece.position;

  const rotatedShape = getRotatedPiece(piece.shape, rotation, flipped);

  const { rotatedCellX, rotatedCellY } = getRotatedCellCoords({
    cell,
    piece,
    rotation,
    flipped,
  });
  const pieceCoords = { x: panelX - rotatedCellX, y: panelY - rotatedCellY };

  const outputBoard = mapBoard(board, (cellArr) => [...cellArr]);
  // ISSUE: MAKE SECTION PURE WITH REDUCER
  rotatedShape.forEach((pieceRow, YinShape) =>
    pieceRow.forEach((cellPresence, XinShape) => {
      if (!cellPresence) return;
      const coveredPanelY = YinShape + pieceCoords.y;
      const coveredPanelX = XinShape + pieceCoords.x;

      const outOfBoard =
        coveredPanelY < 0 ||
        coveredPanelY > 5 ||
        coveredPanelX < 0 ||
        coveredPanelX > 8;
      if (outOfBoard) return;

      outputBoard[coveredPanelY][coveredPanelX].push(cellPresence);
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
      coveringCells: coveringCellArray,
    };
  };

  const panelWithPieces = mapBoard(panelsWithoutPieces, addCoverageToPanels);
  return panelWithPieces;

  // const panelsWithPlacedPositionCovered = mapBoard(
  //   panelsWithoutPieces,
  //   (panelDetails: PanelDetails): PanelDetails => {
  //     const cellsCovering = gamePieces.filter(({ position }) => {
  //       return (
  //         position?.panelX === panelDetails.panel.panelX &&
  //         position.panelY === panelDetails.panel.panelY
  //       );
  //     });
  //     if (cellsCovering.length === 0) return panelDetails;

  //     return {
  //       ...panelDetails,
  //       state: "covered",
  //       coveredBy: cellsCovering[0].position!.cell,
  //     };
  //   }
  // );

  // return panelsWithPlacedPositionCovered;
};

export default getBoardFromPositions;
