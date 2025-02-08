export type PieceShape<T> = [T][] | [T, T][] | [T, T, T][];

export type CellPresence = boolean; // Whether that rectangle slot has a cell

export type Piece = {
  shape: PieceShape<CellPresence>;
  pieceId: string;
};
