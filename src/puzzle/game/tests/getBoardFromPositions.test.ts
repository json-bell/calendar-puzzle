import boardPanels from "../../boardPanels";
import puzzlePieces from "../../puzzlePieces";
import { BoardShape, GamePiece } from "../../types";
import mapBoard from "../../utils/mapBoard";
import {
  addPieceCoverageToBoard,
  BoardCoverage,
  getBoardCoverage,
  getPiecelessBoard,
} from "../getBoardFromPositions";

describe("getPiecelessBoard", () => {
  it("returns an array of arrays of the right shape", () => {
    expect(getPiecelessBoard().length).toBe(6);
    getPiecelessBoard().forEach((row) => expect(row.length).toBe(9));
  });
  it("has panels of the right structure", () => {
    getPiecelessBoard().forEach((row) =>
      row.forEach((cell) =>
        expect(cell).toMatchObject({
          state: expect.stringMatching(/(free)|(wall)/),
          panel: {
            content: expect.anything(),
            contentIndex: expect.any(Number),
            panelX: expect.any(Number),
            panelY: expect.any(Number),
            type: expect.stringMatching(
              /^(dayNumber)|(dayName)|(month)|(empty)|(wall)$/
            ),
          },
        })
      )
    );
  });
});

describe("addPieceCoverageToBoard", () => {
  const emptyBoard: BoardCoverage = mapBoard(boardPanels, () => []);
  const gamePieces: GamePiece[] = puzzlePieces.map((piece) => ({
    piece,
    position: null,
  }));
  const placedPiece: GamePiece = {
    piece: gamePieces[0].piece,
    position: {
      cell: { cellSlug: "", cellX: 0, cellY: 0, pieceId: 0 },
      panelX: 2,
      panelY: 0,
      rotation: 0,
      flipped: 0,
    },
  };
  const otherPlacedPiece: GamePiece = {
    piece: gamePieces[1].piece,
    position: {
      cell: { cellSlug: "", cellX: 1, cellY: 1, pieceId: 1 },
      panelX: 6,
      panelY: 3,
      rotation: 0,
      flipped: 0,
    },
  };

  it("doesn't mutate the board when there are no piece positions", () => {
    const boardCoverage = addPieceCoverageToBoard(emptyBoard, gamePieces[0]);

    boardCoverage.forEach((row) =>
      row.forEach((coveringCellsArray) =>
        expect(coveringCellsArray).toEqual([])
      )
    );
  });
  it("appropriately places cells to cover the board for top-left placed cell", () => {
    const gamePiece: GamePiece = {
      piece: gamePieces[0].piece,
      position: {
        cell: { cellSlug: "", cellX: 0, cellY: 0, pieceId: 0 },
        panelX: 2,
        panelY: 0,
        rotation: 0,
        flipped: 0,
      },
    };

    const newBoard = addPieceCoverageToBoard(emptyBoard, gamePiece);
    const totalPlacedCells = newBoard.reduce((cumSum, row) => {
      return (
        cumSum + row.reduce((rowSum, cellArray) => rowSum + cellArray.length, 0)
      );
    }, 0);
    expect(totalPlacedCells).toBe(5);
    const expectedBoard = [
      [0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    expect(mapBoard(newBoard, (cellArray) => cellArray.length)).toEqual(
      expectedBoard
    );
  });
  it("appropriately places cells to cover the board for arbitrary cell", () => {
    const gamePiece: GamePiece = {
      piece: gamePieces[0].piece,
      position: {
        cell: { cellSlug: "", cellX: 2, cellY: 1, pieceId: 0 },
        panelX: 2,
        panelY: 4,
        rotation: 0,
        flipped: 0,
      },
    };

    const newBoard = addPieceCoverageToBoard(emptyBoard, gamePiece);
    const totalPlacedCells = newBoard.reduce((cumSum, row) => {
      return (
        cumSum + row.reduce((rowSum, cellArray) => rowSum + cellArray.length, 0)
      );
    }, 0);
    expect(totalPlacedCells).toBe(5);
    const expectedBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    expect(mapBoard(newBoard, (cellArray) => cellArray.length)).toEqual(
      expectedBoard
    );
  });

  type CoordsInput = {
    panelX: number;
    panelY: number;
  };
  const overflowingTestData: [string, CoordsInput, BoardShape<0 | 1>][] = [
    [
      "top-right",
      { panelX: 8, panelY: 0 },
      [
        [0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
    ],
    [
      "bottom-left",
      { panelX: 0, panelY: 5 },
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0, 0, 0],
      ],
    ],
  ];
  it.each(overflowingTestData)(
    "handles overflowing pieces by ignoring out of board-cells: %s",
    (_, coords, expectedBoard) => {
      const pieceFromCoords = ({ panelX, panelY }: CoordsInput) => {
        const gamePiece: GamePiece = {
          piece: {
            pieceId: 1,
            slug: "1",
            shape: [
              [0, 1, 0],
              [1, 1, 1],
              [0, 1, 0],
            ].map((row) => row.map((num) => !!num)) as [[boolean]],
          },
          position: {
            cell: { cellSlug: "", cellX: 1, cellY: 1, pieceId: 0 },
            panelX,
            panelY,
            rotation: 0,
            flipped: 0,
          },
        };
        return gamePiece;
      };

      const newBoard = addPieceCoverageToBoard(
        emptyBoard,
        pieceFromCoords(coords)
      );
      const totalPlacedCells = newBoard.reduce((cumSum, row) => {
        return (
          cumSum +
          row.reduce((rowSum, cellArray) => rowSum + cellArray.length, 0)
        );
      }, 0);
      expect(totalPlacedCells).toBe(3);

      expect(mapBoard(newBoard, (cellArray) => cellArray.length)).toEqual(
        expectedBoard
      );
    }
  );
  it.todo("rotates piece correctly");
  it("doesn't mutate the board", () => {
    const cleanBoard = mapBoard(boardPanels, () => []);
    const inputBoard = mapBoard(boardPanels, () => []);
    addPieceCoverageToBoard(inputBoard, placedPiece);
    expect(inputBoard).toEqual(cleanBoard);
    expect(inputBoard).not.toBe(cleanBoard);
  });
  it("doesn't mutate a board with an already placed cell", () => {
    const cleanBoard = mapBoard(boardPanels, () => []);
    const inputBoard = mapBoard(boardPanels, () => []);
    const cleanBoardWithCell = addPieceCoverageToBoard(cleanBoard, placedPiece);
    const inputBoardWithCell = addPieceCoverageToBoard(inputBoard, placedPiece);
    addPieceCoverageToBoard(inputBoardWithCell, otherPlacedPiece);
    expect(inputBoardWithCell).toEqual(cleanBoardWithCell);
    expect(inputBoardWithCell).not.toBe(cleanBoardWithCell);
  });
});

describe("getBoardCoverage", () => {
  it("doesn't mutate the board when there are no piece positions", () => {
    const gamePieces: GamePiece[] = puzzlePieces.map((piece) => ({
      piece,
      position: null,
    }));
    const boardCoverage = getBoardCoverage(gamePieces);
    boardCoverage.forEach((row) =>
      row.forEach((coveringCellsArray) =>
        expect(coveringCellsArray).toEqual([])
      )
    );
  });
  it.todo("covers the right number of cells");
});

describe("getBoardFromPositions", () => {
  it.todo("doesn't mutate game pieces");
  it.todo("gets the board from positions");
});
