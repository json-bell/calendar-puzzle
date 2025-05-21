import findBoardComponents from "../findBoardComponents";

describe("calculateComponentSizes.test.ts", () => {
  it("separates components into distinct numbers", () => {
    expect(
      findBoardComponents([
        [1, null, 2],
        ["hi", null, 4],
        [null, 2, null],
      ])
    ).toEqual([
      [1, null, 2],
      [1, null, 2],
      [null, 3, null],
    ]);
  });

  it("correctly ignores all falsies", () => {
    expect(
      findBoardComponents([
        [false, 0, null],
        [NaN, "", false],
      ])
    ).toEqual([
      [null, null, null],
      [null, null, null],
    ]);
  });

  it("correctly handles oddly shaped components", () => {
    const board = [
      [12345, 12345, 12345, 12345, 12345, 12345, 12345, 12345],
      [12345, false, false, false, false, false, false, 12345],
      [12345, false, 12345, 12345, 12345, 12345, false, 12345],
      [12345, false, 12345, false, false, false, false, 12345],
      [12345, false, 12345, 12345, 12345, 12345, 12345, 12345],
    ];
    const expected = [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, null, null, null, null, null, null, 1],
      [1, null, 1, 1, 1, 1, null, 1],
      [1, null, 1, null, null, null, null, 1],
      [1, null, 1, 1, 1, 1, 1, 1],
    ];
    expect(findBoardComponents(board)).toEqual(expected);
  });
});
