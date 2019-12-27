const path = require("path");
const express = require("express");
const helmet = require("helmet");
const multer = require("multer");
const fs = require("fs");
const parser = require("./util/parser");
const upload = multer({ dest: "uploads/" });
const app = express();
const port = 3000;

app.use(helmet());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.post("/parse", upload.single("sourcefile"), async function(req, res, next) {
  // req.file is the `source` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
  let result = "";
  try {
    result = await parser.parseXml(__dirname + path.sep + req.file.path);
  } catch (err) {
    next(err);
  } finally {
    fs.unlink(req.file.path, err => {
      if (err) throw err;
      console.log("File was deleted");
    });
  }
  res.send({ result: result });
});

const server = app.listen(port, () =>
  console.log(`App listening on port ${port}`)
);

module.exports = server;
