module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Board", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
    },
  });
};
