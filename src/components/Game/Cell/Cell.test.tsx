import renderWithContext from "../../../tests/utils/renderWithContent";
import Cell from "./Cell";
import userEvent from "@testing-library/user-event";

describe("Cell", () => {
  it("applies selected cell when clicked", async () => {
    const user = userEvent.setup();
    const { getByTestId } = renderWithContext(
      <Cell cell={{ cellSlug: "test-slug", pieceId: 2, x: 0, y: 0 }} />
    );

    const cellComp = getByTestId("cell");
    expect(cellComp.className).not.toMatch(/selectedCell/);

    await user.click(cellComp);

    expect(cellComp.className).toMatch(/selectedCell/);
  });
  it("applies selected puzzle piece when clicked", () => {});
});
