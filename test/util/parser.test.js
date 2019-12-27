const parser = require("../../util/parser");
const path = require("path");

describe("parser", () => {
  test("parseXml returns correct result", async () => {
    const result = await parser.parseXml(__dirname + path.sep + "test.xml");
    const expected = [
      "note/body",
      "note/from",
      "note/heading",
      "note/heading/@/style",
      "note/to"
    ];
    expect(result).toStrictEqual(expected);
  });
});
