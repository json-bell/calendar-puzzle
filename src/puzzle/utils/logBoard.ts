import { CellType } from "../pieceTypes";
import { Board } from "../types";
import mapBoard from "./mapBoard";

const joinCoveringCells = (coveringCells: CellType[]) =>
  coveringCells.map(({ pieceId }) => pieceId).join("");

const logBoard = (board: Board) => {
  const visualBoard = mapBoard(
    board,
    ({ coveringCells }, colIndex, rowIndex) => {
      if (rowIndex === 5 && colIndex === 8) {
        return `${joinCoveringCells(coveringCells)}W | `;
      }

      if (coveringCells.length === 0) return "- | ";
      return `${joinCoveringCells(coveringCells)} | `;
    }
  );
  console.log(visualBoard.map((arr) => arr.join("")).join("\n"));
};

export default logBoard;
