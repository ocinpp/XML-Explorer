var path = require("path");

module.exports.root = (function() {
  return path.dirname(require.main.filename || process.mainModule.filename);
})();
