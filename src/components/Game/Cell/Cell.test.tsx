import renderWithContext from "../../../tests/utils/renderWithContent";
import PuzzlePiece from "../PuzzlePiece/PuzzlePiece";
import Cell from "./Cell";
import userEvent from "@testing-library/user-event";

describe("Cell", () => {
  it("applies selected cell when clicked", async () => {
    const user = userEvent.setup();
    const { getByTestId } = renderWithContext(
      <>
        <Cell cell={{ cellSlug: "test", pieceId: 2, cellX: 0, cellY: 0 }} />
        <Cell cell={{ cellSlug: "test-2", pieceId: 2, cellX: 0, cellY: 0 }} />
      </>
    );

    const cellComp = getByTestId("cell-test");
    const selectedRegex = /selectedCell/;
    expect(cellComp.className).not.toMatch(selectedRegex);

    await user.click(cellComp);

    expect(cellComp.className).toMatch(selectedRegex);
    expect(getByTestId("cell-test-2").className).not.toMatch(selectedRegex);
  });
  it("applies selected puzzle piece when clicked", async () => {
    const user = userEvent.setup();
    const { getByTestId } = renderWithContext(
      <>
        <PuzzlePiece piece={{ pieceId: 2, shape: [], slug: "1" }} />
        <PuzzlePiece piece={{ pieceId: 4, shape: [], slug: "4" }} />
        <Cell cell={{ cellSlug: "test", pieceId: 2, cellX: 0, cellY: 0 }} />
        <Cell cell={{ cellSlug: "test-4", pieceId: 4, cellX: 0, cellY: 0 }} />
      </>
    );

    const cellComp2 = getByTestId("cell-test");
    const cellComp4 = getByTestId("cell-test-4");
    const selectedRegex = /selectedPiece/;

    expect(cellComp2.className).not.toMatch(selectedRegex);

    await user.click(cellComp2);

    expect(cellComp2.className).toMatch(selectedRegex);
    expect(cellComp4.className).not.toMatch(selectedRegex);
  });
});
