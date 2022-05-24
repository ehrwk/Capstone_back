const Op = require("sequelize").Op;

const { Follow } = require("../models/index");
const { Plan } = require("../models/index");
const { Goal } = require("../models/index");
const { User } = require("../models/index");

exports.getFollow = async (user_id) => {
  return await Follow.findAll({
    where: {
      follower: user_id,
    },
  });
};
