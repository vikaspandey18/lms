import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, requried: true, trim: true },
    image: { type: String, trim: true },
    pptfile: { type: String, trim: true },
    standard: { type: mongoose.Types.ObjectId, ref: "Standard" },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", BookSchema);

export default Book;
