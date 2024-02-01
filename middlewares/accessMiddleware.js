import { verifytoken } from "../utils/tokenUtils.js";

export const accessHandler = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userid, username } = verifytoken(token);
    req.user = { userid, username };
    next();
  } else {
    throw new Error("No Token Found");
  }
};
