import { PanelDetails } from "./panelTypes";

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
  pieceId: number;
  rotation: 0 | 1 | 2 | 3;
  x: number;
  y: number;
};

export type Game = {
  piecePositions: PiecePosition[];
  board: Board;
};
