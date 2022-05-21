module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Goal", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    goal_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    board_category: {
      type: DataTypes.STRING,
    },
    copied_from: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: -1,
    },
  });
};
