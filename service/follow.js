const Op = require("sequelize").Op;
const { Follow } = require("../models/index");
const { User } = require("../models/index");

exports.createFollow = async (follower, following) => {
  return await Follow.create({
    follower: follower,
    following: following,
  });
};

exports.getFollow = async (follower, following) => {
  return await Follow.findOne({
    attributes: ["follower", "following"],
    where: {
      follower: follower,
      following: following,
    },
  });
};

exports.deleteFollow = async (follower, following) => {
  return await Follow.destroy({
    where: {
      follower: follower,
      following: following,
    },
  });
};

exports.getFollowing = async (user_id) => {
  return await Follow.findAll({
    include: [
      {
        model: User,
        attributes: ["user_id", "nickname"],
      },
    ],
    attributes: {
      exclude: ["fol_time", "createdAt", "updatedAt"],
    },
    where: {
      following: user_id,
    },
  });
};

exports.getFollower = async (user_id) => {
  return await Follow.findAll({
    include: [
      {
        model: User,
        attributes: ["user_id", "nickname"],
      },
    ],
    attributes: {
      exclude: ["fol_time", "createdAt", "updatedAt"],
    },
    where: {
      follower: user_id,
    },
  });
};
