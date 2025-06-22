var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _users = require("./users");

function allModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  return {
    category,
    users,
  };
}
module.exports = allModels;
module.exports.allModels = allModels;
module.exports.allModels = allModels;
