const collections = require("../../util/collections");

describe("addSets", () => {
  test("returns without duplicates", () => {
    const s1 = new Set(["a", "b"]);
    const s2 = new Set(["b", "c"]);
    const s3 = new Set(["a", "b", "c"]);
    collections.addSets(s1, s2);
    expect(s1).toStrictEqual(s3);
  });

  test("returns in insertion order", () => {
    const s1 = new Set(["b", "a", "f"]);
    const s2 = new Set(["z", "y"]);
    const s3 = new Set(["b", "a", "f", "z", "y"]);
    collections.addSets(s1, s2);
    expect(s1).toStrictEqual(s3);
  });
});

// setToSortedArray
