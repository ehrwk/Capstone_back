const express = require("express");
const app = express();
const router = express.Router();

const { validationResult } = require("express-validator");
const { body } = require("express-validator");

const jwt = require("../module/jwt");

const userService = require("../service/user");
const bcypt = require("bcrypt");

app.use(express.json());

const validateUser = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return res.status(400).json(err);
  next();
};

const { options } = require("../config/jwt.config");

//로그인
router.post(
  "/",
  [
    body("user_id").trim().notEmpty().withMessage("id 확인"),
    body("password").trim().isLength({ min: 6 }).withMessage("비밀번호 확인"),
    validateUser,
  ],
  async (req, res) => {
    const user = req.body;
    const result = await userService.getUserId(req.body.user_id);
    console.log(result);

    //id 검사
    if (!result) {
      return res.status(200).send({
        success: false,
        message: "존재하지 않는 계정입니다.",
      });
    } else {
      const encodedPassword = await userService.getPw(req.body.user_id);

      let check = await bcypt.compare(user.password, encodedPassword.password);
      console.log(check);

      //pw 검사
      if (check == false) {
        return res.status(400).send({
          success: false,
          message: "비밀번호가 틀렸습니다.",
        });
      } else {
        const jwtToken = await jwt.sign(result);
        console.log(jwtToken);
        // const verify = await jwt.verify(jwtToken.token);
        // console.log(verify);
        //발급된 시간이 decode되어 return

        res.status(200).send({
          success: true,
          token: jwtToken.token,
          data: result,
          message: "로그인 성공",
        });
      }
    }
  }
);

module.exports = router;
