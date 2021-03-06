const express = require("express");
const app = express();
const router = express.Router();

const user = require("./user");
const auth = require("./auth");
const follow = require("./follow");
const goal = require("./goal");
const plan = require("./plan");
const liked = require("./liked");
const feed = require("./feed");

router.use("/user", user);
router.use("/auth", auth);
router.use("/follow", follow);
router.use("/goal", goal);
router.use("/plan", plan);
router.use("/liked", liked);
router.use("/feed", feed);

module.exports = router;

// module.exports = router; 안넣으면 작동안함.

// app.get("api", function (요청, 응답) {
//   응답.send("");
// });

//작동 안되면 98% 오타, 1% 저장안함, 1% 서버재실행 안함
//npm install nodemon -> 저장시 자동으로 서버 재실행
