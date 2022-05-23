const Op = require("sequelize").Op;

const { Goal } = require("../models/Goal");
const { Plan } = require("../models/index");

exports.createPlan = async (goal_id, plan_title, content) => {
  return await Plan.create({
    goal_id: goal_id,
    plan_title: plan_title,
    content: content,
  });
};

exports.getPlan = async (goal_id) => {
  return await Plan.findAll({
    attribute: ["id", "goal_id", "plan_title", "is_checked", "content"],
    where: {
      goal_id: goal_id,
    },
  });
};

exports.updatePlan = async (id, plan_title, content) => {
  return await Plan.update(
    {
      plan_title: plan_title,
      content: content,
    },
    {
      where: {
        id: id,
      },
    }
  );
};

exports.getPlanInfo = async (goal_id, plan_id) => {
  return await Plan.findOne({
    where: {
      goal_id: goal_id,
      id: plan_id,
    },
  });
};
