const express = require("express");
const app = express();
const router = express.Router();

const { body } = require("express-validator");

const jwt = require("../module/jwt");

const { isLogin } = require("../middleware/index");
app.use(express.json());

module.exports = router;
