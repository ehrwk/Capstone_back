const Op = require("sequelize").Op;

const { User } = require("../models/index");

exports.getUserId = async (user_id) => {
  return await User.findOne({
    attributes: ["id", "user_id", "nickname"],
    where: {
      user_id: user_id,
    },
  });
};

exports.getPw = async (user_id) => {
  return await User.findOne({
    attributes: ["password"],
    where: {
      user_id: user_id,
    },
  });
};

exports.getNickname = async (id) => {
  return await User.findOne({
    attributes: ["nickname"],
    where: {
      id: id,
    },
  });
};

exports.getUser = async (id) => {
  return await User.findOne({
    attributes: ["id", "user_id", "nickname"],
    where: {
      id: id,
    },
  });
};

exports.createUser = async (user_id, password, nickname) => {
  return await User.create({
    user_id: user_id,
    password: password,
    nickname: nickname,
  });
};

exports.updateUser = async (id, nickname) => {
  return await User.update(
    {
      nickname: nickname,
    },
    {
      where: {
        id: id,
      },
    }
  );
};
