const express = require("express");
const app = express();
const router = express.Router();

const { validationResult } = require("express-validator");
const { body } = require("express-validator");

const jwt = require("../module/jwt");

const likedService = require("../service/liked");

const { isLogin } = require("../middleware/index");

//app.use(express.json());
const validateLiked = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty())
    return res.status(400).send({
      success: false,
      data: err,
    });
  next();
};

//goal에 해당하는 plan인지 확인해야하는데 일단 진행...
//좋아요 중복 막기
router.post("/:goal_id/:plan_id", isLogin, async (req, res) => {
  const plan_id = req.params.plan_id;

  const token = req.get("Authorization");
  const result = await jwt.decode(token);
  let userInfo = JSON.stringify(result.id);
  console.log(userInfo);

  const getGoalInfo = await likedService.getUserInfo(plan_id, userInfo);

  if (getGoalInfo) {
    return res.status(404).send({
      success: false,
      data: getGoalInfo,
      message: "좋아요는 1번만 가능합니다",
    });
  } else {
    const createLiked = await likedService.createLiked(plan_id, userInfo);
    return res.status(201).send({
      success: true,
      data: createLiked,
      message: "create Liked",
    });
  }
});

router.get("/:goal_id/:plan_id", isLogin, async (req, res) => {
  const goal_id = req.params.goal_id;
  const plan_id = req.params.plan_id;

  const token = req.get("Authorization");
  const result = await jwt.decode(token);
  let userInfo = JSON.stringify(result.id);

  const getUser = await likedService.getUser(plan_id);
  return res.status(200).send({
    success: true,
    data: getUser,
    message: "Get Liked_list",
  });
});

module.exports = router;
