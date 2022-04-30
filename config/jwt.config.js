const jwtConfig = {
  secretKey: "TlZmfltgksZlek", //시크릿 키
  options: {
    algorithm: "HS256", //해싱 알고리즘
    expiresIn: "30m", //토큰 유효시간
    issuer: "issuer",
  },
};

module.exports = jwtConfig;
