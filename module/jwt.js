const randToken = require("rand-token");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/jwt.config");
const { options } = require("../config/jwt.config");

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
  //jwt생성
  sign: async (info) => {
    let payload = {
      id: info.id,
      email: info.email,
    };

    const result = {
      token: jwt.sign(payload, secretKey, options),
      refreshToken: randToken.uid(256),
    };
    return result;
  },

  // verify: async (token) => {
  //   let decoded;
  //   try {
  //     decoded = jwt.verify(token, secretKey);
  //   } catch (err) {
  //     if (err.message === "jwt expired") {
  //       console.log("유효기간 만료");
  //       return "유효기간 만료";
  //     } else if (err.message === "invalid token") {
  //       console.log("유효하지 않은 토큰");
  //       return "유효하지 않은 토큰";
  //     } else {
  //       console.log("유효하지 않은 토큰");
  //       return "유효하지 않은 토큰";
  //     }
  //   }
  //   return decoded;
  // },

  //decode시 Bearer 추가하는거 확인하기
  decode: async (token) => {
    token = token.split("Bearer ")[1];
    decode = jwt.decode(token, secretKey, options);
    return decode;
  },
};
