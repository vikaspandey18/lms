import mongoose from "mongoose";

const StandardSchema = new mongoose.Schema(
  {
    name: { type: String, requried: true, trim: true },
  },
  {
    timestamps: true,
  }
);

const Standard = mongoose.model("Standard", StandardSchema);

export default Standard;
