import User from "../models/userModel.js";
import { createtoken } from "../utils/tokenUtils.js";

export const logincontroller = async (req, res) => {
  const user = await User.findOne(req.body);
  if (user) {
    const token = createtoken({ userid: user._id, username: user.name });
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    return res.status(200).json({ msg: "Login Successfully" });
  } else {
    return res.status(400).json({ msg: "Failed To Login" });
  }
};

export const registercontroller = async (req, res) => {
  const { password, confirmpassword } = req.body;
  if (password === confirmpassword) {
    const user = await User.create(req.body);
    if (user) {
      return res
        .status(200)
        .json({ msg: "Register Successfully, Kindly Login" });
    } else {
      return res.status(400).json({ msg: "Failed To Register" });
    }
  } else {
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password Does Not Match" });
  }
};

export const logoutcontroller = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  return res.status(200).json({ msg: "Logout Successfull" });
};
