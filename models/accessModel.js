import mongoose from "mongoose";

const AccessSchema = new mongoose.Schema(
  {
    code: { type: String, requried: true, trim: true },
    bookid: { type: mongoose.Types.ObjectId, ref: "Book" },
    userid: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const AccessCode = mongoose.model("AccessCode", AccessSchema);

export default AccessCode;
