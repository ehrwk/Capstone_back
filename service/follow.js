const Op = require("sequelize").Op;
const { Follow } = require("../models/index");

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

// exports.getFollowerCnt = async (follower, following) => {
//   return await Follow.findAll({
//     attributes: [],
//     where: {
//       following: following,
//     },
//   });
// };

exports.getFollowingCnt = async (follower, following) => {};

exports.deleteFollow = async (follower, following) => {
  return await Follow.destroy({
    where: {
      follower: follower,
      following: following,
    },
  });
};
