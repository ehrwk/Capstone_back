module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Follow", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    follower: {
      type: DataTypes.INTEGER,
    },
    following: {
      type: DataTypes.INTEGER,
    },
  });
};
