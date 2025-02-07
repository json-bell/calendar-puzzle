import concatStyles from "./concatClassNames";

it("combines several classNames", () => {
  expect(concatStyles("hello", "yes")).toBe("hello yes");
});
it("ignores falsies", () => {
  expect(concatStyles("hello", false, "", null, "card")).toBe("hello card");
});
