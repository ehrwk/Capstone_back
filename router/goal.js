const express = require("express");
const app = express();
const router = express.Router();

const { validationResult } = require("express-validator");
const { body } = require("express-validator");

const jwt = require("../module/jwt");

const goalService = require("../service/goal");
const { isLogin } = require("../middleware/index");

app.use(express.json());

const validateGoal = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty())
    return res.status(400).send({
      success: false,
      data: err,
    });
  next();
};

//Goal 만들기
router.post(
  "/",
  [body("goal_title").trim().notEmpty().withMessage("목표 확인"), validateGoal],
  isLogin,
  async (req, res) => {
    const goal = req.body;
    const { goal_title, board_category } = goal;

    const token = req.get("Authorization");
    const result = await jwt.decode(token);
    let userInfo = JSON.stringify(result.id);

    const createGoal = await goalService.createGoal(
      userInfo,
      goal_title,
      board_category
    );

    return res.status(201).send({
      success: true,
      data: createGoal,
      message: "create Goal",
    });
  }
);

//모든 Goal정보 가져오기
router.get("/", isLogin, async (req, res) => {
  const token = req.get("Authorization");
  const result = await jwt.decode(token);
  let userInfo = JSON.stringify(result.id);

  const getGoal = await goalService.getGoal(userInfo);

  return res.status(200).send({
    success: true,
    data: getGoal,
    message: "goal 조회 완료",
  });
});

//Goal정보 수정
router.patch(
  "/",
  isLogin,
  [
    body("id").trim().notEmpty().withMessage("goal id 정보 확인"),
    body("goal_title").trim().notEmpty().withMessage("goal title 정보 확인"),
    body("board_category")
      .trim()
      .notEmpty()
      .withMessage("goal board_category 정보 확인"),
    validateGoal,
  ],
  async (req, res) => {
    const Board = req.body;
    const { id, goal_title, board_category } = Board;
    const token = req.get("Authorization");
    const result = await jwt.decode(token);
    let userInfo = JSON.stringify(result.id);

    //goal 게시글 수 확인후 validate
    const getUser = await goalService.getUser(id, userInfo);
    if (getUser == null) {
      return res.status(404).send({
        success: false,
        message: "작성자가 아닙니다.",
      });
    } else {
      const updateGoal = await goalService.updateGoal(
        id,
        goal_title,
        board_category
      );
      //goal_title가져오는거 추가
      return res.status(201).send({
        success: true,
        data: updateGoal.goal_title,
        message: "update goal",
      });
    }
  }
);

//Goal 1개 출력
router.get("/:id", isLogin, async (req, res) => {
  const id = req.params.id;

  const token = req.get("Authorization");
  const result = await jwt.decode(token);
  let userInfo = JSON.stringify(result.id);

  const getUser = await goalService.getUser(id, userInfo);
  if (getUser == null) {
    return res.status(404).send({
      success: false,
      message: "작성자가 아닙니다.",
    });
  } else {
    const getGoalInfo = await goalService.getGoalInfo(id);
    return res.status(200).send({
      success: true,
      data: getGoalInfo,
      message: "Get goal_list",
    });
  }
});

module.exports = router;
