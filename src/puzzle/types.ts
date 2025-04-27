import { Panel, PanelDetails } from "./panelTypes";
import { CellType, Piece } from "./pieceTypes";

export type BoardRow<T> = [T, T, T, T, T, T, T, T, T];
export type BoardFromRow<T> = [T, T, T, T, T, T];

export type BoardShape<T> = BoardFromRow<BoardRow<T>>;

export type Board = BoardShape<PanelDetails>;
export type PieceRotation = 0 | 1 | 2 | 3;
export type PieceFlipped = 0 | 1;

export type PieceOrientation = {
  rotation: PieceRotation;
  flipped: PieceFlipped;
};

export type PiecePosition = {
  cell: CellType;
  rotation: PieceRotation;
  flipped: PieceFlipped;
  panelX: number;
  panelY: number;
};

type SelectionRestrictions =
  | {
      selectedPiece: Piece;
      selectedCell: CellType;
      rotation: PieceRotation;
      flipped: PieceFlipped;
    }
  | { selectedPiece: null; selectedCell: null; rotation: null; flipped: null };

export type UserSelection = {
  selectedPanel: Panel | null;
  rotation: PieceRotation | null;
  flipped: PieceFlipped | null;
  selectedPiece: Piece | null;
  selectedCell: CellType | null;
} & SelectionRestrictions;

export type GamePiece = {
  piece: Piece;
  position: null | PiecePosition;
};

export type Game = {
  gamePieces: GamePiece[]; // Source of Truth of Placement
  userSelection: UserSelection;
  board: Board; // deduced from piecePositions
};
