var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _users = require("./users");

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    category,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
