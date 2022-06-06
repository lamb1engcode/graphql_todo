const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../config/env");
const verify = (header) => {
  if (!header) {
    return null;
  }
  const token = header.split(" ")[1];
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decodedFromToken) => {
    if (err) {
      return null;
    } else {
      return {userId: decodedFromToken};
    }
  });
};

const createToken = (data) => {
  return jwt.sign(
    {
      iss: "Nguyen Nhu Bao Phuong",
      data: data,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    ACCESS_TOKEN_SECRET
  );
};

module.exports = {
  verify,
  createToken,
};
