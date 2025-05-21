import { Board } from "../types";
import mapBoard from "./mapBoard";

const logBoard = (board: Board) => {
  const visualBoard = mapBoard(
    board,
    ({ coveringCells }, colIndex, rowIndex) => {
      if (rowIndex === 5 && colIndex === 8) {
        return `${coveringCells.map(({ pieceId }) => pieceId).join("")}W | `;
      }
      if (coveringCells.length === 0) return "- | ";
      return `${coveringCells.map(({ pieceId }) => pieceId).join("")} | `;
    }
  );
  console.log(visualBoard.map((arr) => arr.join("")).join("\n"));
};

export default logBoard;
