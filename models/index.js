var path = require("path");
const Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, "..", "config", "config.json"))[env];
var db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./User")(sequelize, Sequelize);
db.Follow = require("./Follow")(sequelize, Sequelize);
db.Goal = require("./Goal")(sequelize, Sequelize);

db.Follow.belongsTo(db.User, { foreignKey: "follower", targetKey: "id" }); //User 1 : N Follow
db.Goal.belongsTo(db.Board, { foreignKey: "user_id" });

module.exports = db;
