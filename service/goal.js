const Op = require("sequelize").Op;

const { Goal } = require("../models/index");
const { Plan } = require("../models/index");

exports.createGoal = async (user_id, goal_title, board_category) => {
  return await Goal.create({
    user_id: user_id,
    goal_title: goal_title,
    board_category: board_category,
  });
};

exports.getGoal = async (user_id) => {
  return await Goal.findAll({
    attribute: ["id", "user_id", "goal_title", "board_category", "copied_from"],
    where: {
      user_id: user_id,
    },
  });
};

exports.getUser = async (id, user_id) => {
  return await Goal.findOne({
    attribute: ["id"],
    where: {
      id: id,
      user_id: user_id,
    },
  });
};

exports.updateGoal = async (id, goal_title, board_category) => {
  return await Goal.update(
    {
      goal_title: goal_title,
      board_category: board_category,
    },
    {
      where: {
        id: id,
      },
    }
  );
};

exports.getGoalInfo = async (id) => {
  return await Goal.findAll({
    include: [
      {
        model: Plan,
      },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    where: {
      id: id,
    },
  });
};

exports.getGoalTitle = async (id) => {
  return await Goal.findOne({
    attributes: {
      exclude: ["createdAt", "updatedAt", "board_category"],
    },
    where: {
      id: id,
    },
  });
};
