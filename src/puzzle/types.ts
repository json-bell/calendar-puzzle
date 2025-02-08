import { Panel, PanelDetails } from "./panelTypes";
import { CellType, Piece } from "./pieceTypes";

export type BoardRow<T> = [T, T, T, T, T, T, T, T, T];
export type BoardFromRow<T> = [T, T, T, T, T, T];

export type BoardShape<T> = BoardFromRow<BoardRow<T>>;

export type Board = BoardShape<PanelDetails>;
export type PieceRotation = 0 | 1 | 2 | 3;

export type PiecePosition = {
  cell: CellType;
  rotation: PieceRotation;
  panelX: number;
  panelY: number;
};

export type Game = {
  piecePositions: PiecePosition[]; // Source of Truth
  board: Board; // deduced in useEffect from piecePositions
};

export type UserSelection = {
  selectedPiece: Piece | null;
  selectedPanel: Panel | null;
  rotation: PieceRotation | null;
};
