let uuid = require("uuid");
function getID() {
  return uuid.v4();
}

function getUniqueID() {
  return uuid.v1().split("-")[0];
}

module.exports = { getUniqueID };
