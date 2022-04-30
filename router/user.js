const express = require("express");
const app = express();
const router = express.Router();

const { validationResult } = require("express-validator");
const { body } = require("express-validator");
//const{} 유효성 검사 분리 나중에 하기

const jwt = require("../module/jwt");

const userService = require("../service/user");
const followService = require("../service/follow");
const bcypt = require("bcrypt");
const { isLogin } = require("../middleware/index");

app.use(express.json());

// /user
// 이메일 받은 값이 아니라 일단 넣어서 처리함.

const validateUser = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty())
    return res.status(400).send({
      success: false,
      data: err,
    });
  next();
};

//회원가입
router.post(
  "/",
  [
    body("user_id").trim().notEmpty().withMessage("id 확인"),
    body("email").trim().isEmail().withMessage("이메일 확인"),
    body("password").trim().isLength({ min: 6 }).withMessage("pw는 6글자 이상"),
    body("nickname").trim().notEmpty().withMessage("닉네임 확인"),
    validateUser,
  ],
  async (req, res) => {
    const user = req.body;
    const result1 = await userService.getUserId(req.body.user_id);
    const result2 = await userService.getUserEmail(req.body.email);

    if (result1 || result2) {
      if (result1) {
        return res.status(201).send({
          success: false,
          message: "이미 존재하는 아이디입니다.",
        });
      }

      if (result2) {
        return res.status(201).send({
          success: false,
          message: "이미 존재하는 이메일입니다.",
        });
      }
    } else {
      const { user_id, email, password, nickname } = user;

      const hashPassword = await bcypt.hash(password, 10);
      const createUser = await userService.createUser(
        user_id,
        email,
        hashPassword,
        nickname
      );

      return res.status(201).send({
        success: true,
        data: createUser,
        message: "user create",
      });
    }
  }
);

//유저정보조회
router.get("/", isLogin, async (req, res) => {
  const token = req.get("Authorization");

  const result = await jwt.decode(token);
  let userInfo = JSON.stringify(result.id);
  userInfo = userInfo.replace(/\"/gi, "");

  return res.status(200).send({
    success: true,
    data: userInfo,
    message: "유저정보조회",
  });
});

//회원정보수정
router.patch(
  "/",
  isLogin,
  [body("nickname").trim().notEmpty().withMessage("닉네임 확인"), validateUser],
  async (req, res) => {
    const token = req.get("Authorization");
    const result = await jwt.decode(token);
    let userInfo = JSON.stringify(result.id);

    const user = req.body;
    const updateUser = await userService.updateUser(userInfo, user.nickname);
    const getNickname = await userService.getNickname(userInfo);

    return res.status(201).send({
      success: true,
      data: getNickname.nickname,
      message: "user.nickname update",
    });
  }
);

//유저 팔로잉팔로우수
router.get("/profile", isLogin, async (req, res) => {
  const token = req.get("Authorization");

  const result = await jwt.decode(token);
  let userInfo = JSON.stringify(result.id);
  userInfo = userInfo.replace(/\"/gi, "");
});

//isLogin 확인용
// router.post("/login", isLogin, async (req, res) => {
//   console.log("token 확인중...");
//   res.send("확인중");
// });

module.exports = router;
