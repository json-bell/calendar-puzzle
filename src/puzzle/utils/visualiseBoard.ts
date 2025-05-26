import { PanelDetails } from "../panelTypes";
import { Board, BoardShape } from "../types";
import mapBoard from "./mapBoard";

const seeCoveringCells = ({ coveringCells }: PanelDetails): string =>
  coveringCells.map(({ pieceId }) => pieceId).join("");

function visualiseBoard(board: Board, outputType?: "log"): void;
function visualiseBoard(board: Board, outputType: "string"): string;
function visualiseBoard(board: Board, outputType: "array"): BoardShape<string>;
function visualiseBoard(
  board: Board,
  outputType: "array" | "string" | "log" = "log"
): BoardShape<string> | string | void {
  const simplifiedArray = mapBoard(board, (panelDetails) => {
    const optWallStr = panelDetails.panel.content === "wall" ? "W" : "";

    return seeCoveringCells(panelDetails) + optWallStr || " ";
  });

  if (outputType === "array") return simplifiedArray;
  const boardString = simplifiedArray.map((row) => row.join(" | ")).join("\n");
  if (outputType === "string") return boardString;
  return console.log(boardString);
}

export default visualiseBoard;
