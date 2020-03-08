const parser = require("../../util/parser");
const path = require("path");

describe("parser", () => {
  test("parseXml returns correct result for XML file", async () => {
    const result = await parser.parseXmlFile(__dirname + path.sep + "test.xml");
    const expected = [
      "note/body",
      "note/from",
      "note/heading",
      "note/heading/@/style",
      "note/to"
    ];
    expect(result).toStrictEqual(expected);
  });

  test("parseXml returns null for test file", async () => {
    const result = await parser.parseXmlFile(__dirname + path.sep + "test.txt");
    expect(result).toBeNull();
  });
});
