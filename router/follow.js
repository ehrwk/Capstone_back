const express = require("express");
const app = express();
const router = express.Router();

const { body } = require("express-validator");

const jwt = require("../module/jwt");
const userService = require("../service/user");
const followService = require("../service/follow");

const { isLogin } = require("../middleware/index");
app.use(express.json());

// 팔로우
router.post("/:id", isLogin, async (req, res) => {
  const id = req.params.id;
  const getUser = await userService.getUser(id);

  if (getUser == null) {
    return res.status(201).send({
      success: false,
      message: "없는 유저정보입니다.",
    });
  }

  const token = req.get("Authorization");
  const result = await jwt.decode(token);
  let userInfo = JSON.stringify(result.id);
  userInfo = userInfo.replace(/\"/gi, "");

  //중복유저검출
  const getFollow = await followService.getFollow(userInfo, id);
  if (getFollow != null) {
    return res.status(201).send({
      success: false,
      message: "이미 팔로우한 유저입니다.",
    });
  }

  const createFollow = await followService.createFollow(userInfo, id);

  return res.status(201).send({
    success: true,
    data: createFollow,
    message: "follow",
  });
});

// 언팔로우
router.delete("/:id", isLogin, async (req, res) => {
  const id = req.params.id;
  const getUser = await userService.getUser(id);

  if (getUser == null) {
    return res.status(201).send({
      success: false,
      message: "없는 유저정보입니다.",
    });
  }

  const token = req.get("Authorization");
  const result = await jwt.decode(token);
  let userInfo = JSON.stringify(result.id);
  userInfo = userInfo.replace(/\"/gi, "");

  const getFollow = await followService.getFollow(userInfo, id);
  if (getFollow == null) {
    return res.status(201).send({
      success: false,
      message: "이미 언팔로우한 유저입니다.",
    });
  }

  const deleteFollow = await followService.deleteFollow(userInfo, id);

  return res.status(200).send({
    success: true,
    data: deleteFollow,
    message: "해당 유저를 언팔로우 했습니다.",
  });
});

module.exports = router;
