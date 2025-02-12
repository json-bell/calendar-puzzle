import mapBoard from ".";
import boardPanels from "../../boardPanels";

it("correctly maps board shapes to board shapes", () => {
  expect(mapBoard(boardPanels, () => 1)).toEqual(
    Array(6).fill(Array(9).fill(1))
  );
});
