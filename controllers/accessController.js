import User from "../models/userModel.js";

export const getusercontroller = async (req, res) => {
  const { userid } = req.user;
  const user = await User.findOne({ _id: userid }, { name: 1, _id: 1 });
  if (user) {
    return res.status(200).json({ user });
  } else {
    return res.status(400).json({ msg: "No User Found" });
  }
};
