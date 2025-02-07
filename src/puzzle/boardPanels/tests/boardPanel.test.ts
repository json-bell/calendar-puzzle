import boardPanels from "..";
import { getBoardPanels, rawSetupData } from "../getBoardPanels";

describe("boardPanels", () => {
  it("matches generateBoardPanels", () => {
    expect(getBoardPanels(rawSetupData)).toEqual(boardPanels);
  });
});
