const express = require("express");
const app = express();
const router = express.Router();

const { validationResult } = require("express-validator");
const { body } = require("express-validator");

const jwt = require("../module/jwt");

const goalService = require("../service/goal");
const planService = require("../service/plan");

const { isLogin } = require("../middleware/index");

app.use(express.json());

const validatePlan = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty())
    return res.status(400).send({
      success: false,
      data: err,
    });
  next();
};

//Plan 만들기
router.post(
  "/",
  isLogin,
  [
    body("goal_id").trim().notEmpty().withMessage("goal_id 확인"),
    body("plan_title").trim().notEmpty().withMessage("plan_title 확인"),
    body("content").trim().notEmpty().withMessage("content 확인"),
    validatePlan,
  ],
  async (req, res) => {
    const plan = req.body;
    const { goal_id, plan_title, content } = plan;

    const token = req.get("Authorization");
    const result = await jwt.decode(token);
    let userInfo = JSON.stringify(result.id);

    const getUser = await goalService.getUser(goal_id, userInfo);
    if (getUser == null) {
      return res.status(404).send({
        success: false,
        message: "작성자가 아닙니다.",
      });
    } else {
      const createPlan = await planService.createPlan(
        goal_id,
        plan_title,
        content
      );
      return res.status(201).send({
        success: true,
        data: createPlan,
        message: "create Plan",
      });
    }
  }
);

//모든 Plan정보 가져오기
router.get("/", isLogin, async (req, res) => {
  const token = req.get("Authorization");
  const result = await jwt.decode(token);
  let userInfo = JSON.stringify(result.id);

  const getPlan = await planService.getPlan(userInfo);

  return res.status(200).send({
    success: true,
    data: getPlan,
    message: "plan 조회 완료",
  });
});

//Plan정보 수정
router.patch(
  "/",
  isLogin,
  [
    body("id").trim().notEmpty().withMessage("plan id 확인"),
    body("goal_id").trim().notEmpty().withMessage("goal_id 확인"),
    body("plan_title").trim().notEmpty().withMessage("plan_title 확인"),
    body("content").trim().notEmpty().withMessage("content 확인"),
    validatePlan,
  ],
  async (req, res) => {
    const Plan = req.body;
    const { id, goal_id, plan_title, content } = Plan;
    const token = req.get("Authorization");
    const result = await jwt.decode(token);
    let userInfo = JSON.stringify(result.id);

    //plan 게시글 수 확인후 validate
    //goal 게시글 수 확인후 validate
    const getUser = await goalService.getUser(goal_id, userInfo);
    if (getUser == null) {
      return res.status(404).send({
        success: false,
        message: "작성자가 아닙니다.",
      });
    } else {
      const updatePlan = await planService.updatePlan(id, plan_title, content);

      return res.status(201).send({
        success: true,
        data: updatePlan,
        message: "update plan",
      });
    }
  }
);

//plan 1개만 출력
router.get("/:goal_id/:plan_id", isLogin, async (req, res) => {
  const goal_id = req.params.goal_id;
  const plan_id = req.params.plan_id;

  const token = req.get("Authorization");
  const result = await jwt.decode(token);
  let userInfo = JSON.stringify(result.id);

  const getUser = await goalService.getUser(goal_id, userInfo);
  if (getUser == null) {
    return res.status(404).send({
      success: false,
      message: "작성자가 아닙니다.",
    });
  } else {
    const getPlanInfo = await planService.getPlanInfo(goal_id, plan_id);
    const getGoalTitle = await goalService.getGoalTitle(goal_id);
    return res.status(200).send({
      success: true,
      data: [getGoalTitle, getPlanInfo],
      message: "Get Plan",
    });
  }
});

module.exports = router;
