import cx from "./concatClassNames";

it("combines several classNames", () => {
  expect(cx("hello", "yes")).toBe("hello yes");
});
it("ignores falsies", () => {
  expect(cx("hello", false, "", null, "card")).toBe("hello card");
});
