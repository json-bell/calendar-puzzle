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

type SelectionRrestrictions =
  | { selectedPiece: Piece; selectedCell: CellType }
  | { selectedPiece: null; selectedCell: null };

export type UserSelection = {
  selectedPanel: Panel | null;
  rotation: PieceRotation | null;
  selectedPiece: Piece | null;
  selectedCell: CellType | null;
} & SelectionRrestrictions;

export type GamePiece = {
  piece: Piece;
  position: null | PiecePosition;
};

export type Game = {
  gamePieces: GamePiece[]; // Source of Truth of Placement
  userSelection: UserSelection;
  board: Board; // deduced from piecePositions in reducer
};
