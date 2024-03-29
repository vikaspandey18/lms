import jwt from "jsonwebtoken";

export const createtoken = (payload) => {
  const token = jwt.sign(payload, process.env.JSON_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

export const verifytoken = (token) => {
  const decode = jwt.verify(token, process.env.JSON_SECRET);
  return decode;
};
