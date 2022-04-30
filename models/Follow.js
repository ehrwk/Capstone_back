module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Follow", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    following: {
      type: DataTypes.INTEGER,
    },
    fol_time: {
      type: DataTypes.DATE,
    },
  });
};
