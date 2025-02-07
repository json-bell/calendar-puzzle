type BoxPresence = boolean;

type PieceShapeRow =
  | [BoxPresence, BoxPresence, BoxPresence]
  | [BoxPresence, BoxPresence]
  | [BoxPresence];
type PieceShape = PieceShapeRow[];
type RawShape = ([0 | 1] | [0 | 1, 0 | 1] | [0 | 1, 0 | 1, 0 | 1])[];

export type PuzzlePieceType = {
  shape: PieceShape;
  pieceId: string;
};

const getShapeFromData = (rawShape: RawShape): PieceShape =>
  rawShape.map((row) => {
    return row.map((num) => num === 1) as PieceShapeRow;
  });
const getIdFromData = (rawShape: RawShape): string => {
  return rawShape.map((row) => row.join("")).join("");
};

export const getPuzzlePieces = (rawShapes: RawShape[]): PuzzlePieceType[] => {
  return rawShapes.map((rawShape) => ({
    shape: getShapeFromData(rawShape),
    pieceId: getIdFromData(rawShape),
  }));
};
