const path = require("path");
const fs = require("fs"),
  xml2js = require("xml2js");
const { promisify } = require("util");

const settings = require("../settings.js");
const collections = require("./collections");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const run = async () => {
  const res = await readFileAsync("./data.json");
  console.log(res);
};

async function parseXml(sourceFilePath) {
  const parser = new xml2js.Parser();
  const sourceFile = settings.root + path.sep + sourceFilePath;

  const data = await readFileAsync(sourceFile);
  let res = {};

  parser.parseString(data, function(err, result) {
    const root = Object.keys(result);
    let rootElement = result[root];
    let allTags = findAllTags(rootElement, [root]);
    res.result = collections.setToSortedArray(allTags);
  });

  return res;
}

function findAllTags(objs, elementPath = new Array()) {
  let tags = new Set();
  let arr = new Array();

  // convert to a path separted by "/"
  const path = elementPath.join("/");

  if (!Array.isArray(objs)) {
    arr.push(objs);
  } else {
    arr = objs;
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
