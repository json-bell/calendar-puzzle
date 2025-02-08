import { Panel, PanelDetails } from "./panelTypes";
import { CellType, Piece } from "./pieceTypes";

type BoardRow<T> = [T, T, T, T, T, T, T, T, T];

export type BoardShape<T> = [
  BoardRow<T>,
  BoardRow<T>,
  BoardRow<T>,
  BoardRow<T>,
  BoardRow<T>,
  BoardRow<T>
];

export type Board = BoardShape<PanelDetails>;

export type PiecePosition = {
  cell: CellType;
  rotation: 0 | 1 | 2 | 3;
  panelX: number;
  panelY: number;
};

export type Game = {
  piecePositions: PiecePosition[]; // SOURCE OF TRUTH
  board: Board; //
};

export type Selections = {
  selectedPiece: Piece | null;
  selectedPanel: Panel | null;
};
