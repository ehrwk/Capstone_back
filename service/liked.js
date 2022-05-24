const Op = require("sequelize").Op;

const { User } = require("../models/index");
const { Liked } = require("../models/index");

exports.createLiked = async (plan_id, user_id) => {
  return await Liked.create({
    plan_id: plan_id,
    user_id: user_id,
  });
};

exports.getUserInfo = async (plan_id, user_id) => {
  return await Liked.findOne({
    where: {
      plan_id: plan_id,
      user_id: user_id,
    },
  });
};

exports.getUser = async (plan_id) => {
  return await Liked.findAll({
    where: {
      plan_id: plan_id,
    },
  });
};
