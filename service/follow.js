const Op = require("sequelize").Op;
const { Follow, sequelize } = require("../models/index");
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
  return await sequelize.query(
    `SELECT Users.user_id, Users.nickname, Follows.follower, Follows.following FROM Users LEFT OUTER JOIN Follows ON Users.id = Follows.follower WHERE following = ${user_id}`,
    { type: sequelize.QueryTypes.SELECT }
  );
};

//이게 문제임....

//let query = `SELECT Users.user_id, Users.nickname, Follows.follower, Follows.following FROM Users LEFT OUTER JOIN Follows ON Users.id = Follows.following WHERE follower = {user_id}`;

exports.getFollower = async (user_id) => {
  return await sequelize.query(
    `SELECT Users.user_id, Users.nickname, Follows.follower, Follows.following FROM Users LEFT OUTER JOIN Follows ON Users.id = Follows.following WHERE follower = ${user_id}`,
    { type: sequelize.QueryTypes.SELECT }
  );
};
