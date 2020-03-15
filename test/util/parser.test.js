const parser = require("../../util/parser");
const path = require("path");

describe("Test parseXml with different files", () => {
  test("parseXml returns correct result for XML file", async () => {
    const result = await parser.parseXmlFile(__dirname + path.sep + "test.xml");
    const expected = [
      "note/body",
      "note/from",
      "note/heading",
      "note/heading/@/size",
      "note/heading/@/style",
      "note/related",
      "note/related/item",
      "note/related/item/@/count",
      "note/related/item/id",
      "note/related/item/id/@/location",
      "note/to"
    ];
    expect(result).toStrictEqual(expected);
  });

  test("parseXml returns null for text file", async () => {
    const result = await parser.parseXmlFile(__dirname + path.sep + "test.txt");
    expect(result).toBeNull();
  });

  test("parseXml returns null for empty file", async () => {
    const result = await parser.parseXmlFile(
      __dirname + path.sep + "empty.xml"
    );
    expect(result).toBeNull();
  });

  test("parseXml throws exception for non-existent file", async () => {
    try {
      const result = await parser.parseXmlFile(
        __dirname + path.sep + "no-such-file.xml"
      );
    } catch (e) {
      expect(e).not.toBeNull();
    }
  });
});
