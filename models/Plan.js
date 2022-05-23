module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Plan", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    goal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plan_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_checked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
