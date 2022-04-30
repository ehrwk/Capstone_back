const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/jwt.config");

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};

exports.isLogin = (req, res, next) => {
  let token = req.get("Authorization");

  if (token) {
    token = token.split("Bearer ")[1];

    jwt.verify(token, secretKey, (err) => {
      if (err) {
        res.status(401).send({
          success: false,
          message: "유효하지 않은 token",
          error: "로그인 실패",
        });
      } else {
        next();
      }
    });
  } else {
    res.status(401).send({
      success: false,
      message: "로그인시 jwt 토큰 필요",
      error: "토큰정보 없음",
    });
  }
};
