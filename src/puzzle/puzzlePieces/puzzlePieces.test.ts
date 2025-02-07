import puzzlePieces from ".";
import { getPuzzlePieces } from "./getPuzzlePieces";
import rawPieceData from "./rawPieceData";

describe("boardPanels", () => {
  it("matches generateBoardPanels", () => {
    expect(getPuzzlePieces(rawPieceData)).toEqual(puzzlePieces);
  });
});
