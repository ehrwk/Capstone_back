const express = require("express"); //express참고
const app = express(); //객체 만들기
const port = 5000;

const router = require("./router");

app.use(express.json());
app.use("/api", router);

const { sequelize } = require("./models");

const passport = require("passport");
const passportConfig = require("./config/passport");

app.listen(port, function () {
  console.log("server on " + port);
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("sequelize on");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(passport.initialize());
//passportConfig();

// 서버 만들기 위한 기본 문법, 서버 open
//listen(서버 띄울 포트 번호, 띄운 후 실행할 코드)

//node index.js
//nodeon index.js -> 자동으로 재실행
