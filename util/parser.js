const fs = require("fs"),
  xml2js = require("xml2js");
const { promisify } = require("util");
const collections = require("./collections");
const readFileAsync = promisify(fs.readFile);

/**
 * Parse the XML file to an array of element path and attributes
 * as indicated by sourceFilePath
 * @param {*} sourceFilePath
 */
async function parseXml(sourceFilePath) {
  const parser = new xml2js.Parser();
  const data = await readFileAsync(sourceFilePath);
  let res = {};

  parser.parseString(data, (err, result) => {
    if (result != null) {
      const root = Object.keys(result);
      let rootElement = result[root];
      let allTags = findAllTags(rootElement, [root]);
      res = collections.setToSortedArray(allTags);
    }
  });

  return res;
}

/**
 * Recursively parse the objects and find the element path
 * and attributes
 * @param {*} objects
 * @param {*} elementPath
 */
function findAllTags(objects, elementPath = new Array()) {
  let tags = new Set();
  let arr = new Array();

  // convert to a path separated by "/"
  const path = elementPath.join("/");

  if (!Array.isArray(objects)) {
    arr.push(objects);
  } else {
    arr = objects;
  }

  arr.forEach(obj => {
    keys = Object.keys(obj);
    keys.forEach(key => {
      if (key !== "$" && key !== "_") {
        const newElementPath = Array.from(elementPath);
        newElementPath.push(key);

        // add the path to the tags set
        collections.addSets(tags, new Set([path + "/" + key]));

        // go deeper when the content is an "object"
        for (let i = 0; i < obj[key].length; i++) {
          if (typeof obj[key][i] === "object") {
            collections.addSets(tags, findAllTags(obj[key][i], newElementPath));
          }
        }
      } else if (key === "$") {
        // handle attributes $
        const newElementPath = Array.from(elementPath);
        newElementPath.push("@");

        // add the path to the tags set
        collections.addSets(tags, findAllTags(obj[key], newElementPath));
      }
    });
  });

  return tags;
}

module.exports.parseXml = parseXml;
