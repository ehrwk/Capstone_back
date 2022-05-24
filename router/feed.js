const express = require("express");
const app = express();
const router = express.Router();

const { validationResult } = require("express-validator");
const { body } = require("express-validator");

const jwt = require("../module/jwt");

const feedService = require("../service/feed");

const { isLogin } = require("../middleware/index");

router.get("/", isLogin, async (req, res) => {
  const token = req.get("Authorization");
  const result = await jwt.decode(token);
  let userInfo = JSON.stringify(result.id);

  const getFollow = await feedService.getFollow(userInfo);
  console.log(getFollow);
});

module.exports = router;
