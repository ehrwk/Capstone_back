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
db.Plan = require("./Plan")(sequelize, Sequelize);
db.Liked = require("./Liked")(sequelize, Sequelize);

db.Follow.belongsTo(db.User, { foreignKey: "follower", targetKey: "id" }); //User 1 : N Follow
db.Follow.belongsTo(db.User, { foreignKey: "following", targetKey: "id" });
db.Goal.belongsTo(db.User, { foreignKey: "user_id" });
db.Goal.hasMany(db.Plan, { foreignKey: "goal_id", targetKey: "id" });
db.Plan.belongsTo(db.Goal, { foreignKey: "goal_id", targetKey: "id" });
db.Liked.belongsTo(db.Plan, { foreignKey: "plan_id", targetKey: "id" });
db.Liked.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });

module.exports = db;
