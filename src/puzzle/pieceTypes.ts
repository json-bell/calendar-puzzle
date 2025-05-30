import { PieceId } from "./puzzlePieces/pieceIds";

export type PieceShape<T> = [T][] | [T, T][] | [T, T, T][];

export type CellPresence = CellType | null; // Whether that rectangle slot has a cell

export type Piece = {
  shape: PieceShape<CellPresence>;
  pieceId: PieceId;
  slug: string;
};

export type CellType = {
  pieceId: Piece["pieceId"];
  cellX: number;
  cellY: number;
  cellSlug: string;
};
