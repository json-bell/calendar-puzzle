const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

type CumulCell = number | "unvisited" | null;
type CumulBoard = CumulCell[][];

const findBoardComponents = (
  board: (string | number | boolean | null)[][]
): (number | null)[][] => {
  const boardHeight = board.length;
  if (boardHeight === 0) return [];
  const boardWidth = board[0].length;

  /** We progressively turn these strings into numbers */
  const cumulativeBoard: CumulBoard = board.map((row) =>
    row.map((value) => (value ? "unvisited" : null))
  );

  let id = 1;

  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidth; x++) {
      if (cumulativeBoard[y][x] !== "unvisited") continue;

      // we spread the id
      spreadId({ id, x, y, cumulativeBoard, boardHeight, boardWidth });

      id++;
    }
  }

  return cumulativeBoard as (number | null)[][];
};

export default findBoardComponents;

const spreadId = ({
  id,
  x,
  y,
  cumulativeBoard,
  boardHeight,
  boardWidth,
}: {
  id: number;
  x: number;
  y: number;
  cumulativeBoard: CumulBoard;
  boardHeight: number;
  boardWidth: number;
}): undefined => {
  if (cumulativeBoard[y][x] !== "unvisited") return;

  cumulativeBoard[y][x] = id;
  for (const [deltaX, deltaY] of directions) {
    if (
      x + deltaX < 0 ||
      y + deltaY < 0 ||
      x + deltaX >= boardWidth ||
      y + deltaY >= boardHeight
    )
      continue;
    spreadId({
      boardHeight,
      boardWidth,
      cumulativeBoard,
      id,
      x: x + deltaX,
      y: y + deltaY,
    });
  }
};
