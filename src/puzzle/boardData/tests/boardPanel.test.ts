import boardPanels from "../boardPanels";
import { getBoardPanels, rawSetupData } from "../generatePanelsFromContent";

describe("boardPanels", () => {
  it("matches generateBoardPanels", () => {
    expect(getBoardPanels(rawSetupData)).toEqual(boardPanels);
  });
});
