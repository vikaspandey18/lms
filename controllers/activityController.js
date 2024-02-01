import AccessCode from "../models/accessModel.js";
import Book from "../models/bookModel.js";
import Standard from "../models/standardModel.js";

export const createStandardcontroller = async (req, res) => {
  const { name } = req.body;
  if (name) {
    const createstandard = await Standard.create(req.body);
    if (createstandard) {
      return res.status(200).json({ msg: "Added Subject Successfully" });
    } else {
      return res.status(400).json({ msg: "Failed to Enter Standard" });
    }
  } else {
    return res.status(400).json({ msg: "Kindly Enter Subject" });
  }
};

export const getAllStandard = async (req, res) => {
  const standard = await Standard.find({}, { name: 1 });
  if (standard) {
    return res.status(200).json({ standard });
  } else {
    return res.status(400).json({ msg: "No Standard Found" });
  }
};

export const createBookcontroller = async (req, res) => {
  const image = req.files["image"][0].filename;
  const ppt = req.files["ppt"][0].filename;

  const objectdata = { ...req.body, image: image, pptfile: ppt };

  const createbook = await Book.create(objectdata);
  if (createbook) {
    return res.status(200).json({ msg: "Added Book Successfully" });
  } else {
    return res.status(400).json({ msg: "Failed to Enter Book" });
  }
};

export const getAllBook = async (req, res) => {
  const book = await Book.find({}, { title: 1, image: 1 });
  if (book) {
    return res.status(200).json({ book });
  } else {
    return res.status(400).json({ msg: "No Book Found" });
  }
};

export const getSingleBook = async (req, res) => {
  const { standard, book } = req.body;
  const books = await Book.findOne({ _id: book, standard: standard });
  if (books) {
    return res.status(200).json({ books });
  } else {
    return res.status(400).json({ msg: "No Book Found" });
  }
};

export const newgetSingleBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (book) {
    return res.status(200).json({ book });
  } else {
    return res.status(400).json({ msg: "No Book Found" });
  }
};

export const getaccessCode = async (req, res) => {
  const { code, bookid } = req.body;
  const getcode = await AccessCode.findOne({
    code,
    bookid,
  });

  if (getcode) {
    await AccessCode.updateOne(
      { code, bookid },
      { $set: { userid: req.user.userid } }
    );
    return res.status(200).json({ msg: "Code Applied Successfully" });
  } else {
    return res
      .status(400)
      .json({ msg: "No Code Found, Kindly Check the Code" });
  }
};

export const getcurrentaccessCode = async (req, res) => {
  const { id } = req.params;
  const getbook = await AccessCode.findOne(
    {
      userid: req.user.userid,
      bookid: id,
    },
    { bookid: 1 }
  );

  if (getbook) {
    return res.status(200).json({ getbook });
  } else {
    return res.status(400).json({ msg: "No Access" });
  }
};

export const createaccesscode = async (req, res) => {
  //req.body.userid = req.user.userid;
  const createbook = await AccessCode.create(req.body);
  if (createbook) {
    return res.status(200).json({ msg: "Book Create Successfully" });
  } else {
    return res.status(400).json({ msg: "No Access" });
  }
};
