import express from "express";
import {
  createBookcontroller,
  createStandardcontroller,
  createaccesscode,
  getAllBook,
  getAllStandard,
  getSingleBook,
  getaccessCode,
  getcurrentaccessCode,
  newgetSingleBook,
} from "../controllers/activityController.js";
import upload from "../middlewares/pptmulterMiddleware.js";
import {
  bookvalidator,
  getsinglebookvalidator,
} from "../middlewares/activityMiddleware.js";

const router = express.Router();

router.post("/create-standard", createStandardcontroller);
router.get("/get-all-standard", getAllStandard);
router.post(
  "/create-book",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "ppt", maxCount: 1 },
  ]),
  bookvalidator,
  createBookcontroller
);
router.get("/get-all-book", getAllBook);
router.post("/get-book", getsinglebookvalidator, getSingleBook);
router.get("/get-book/:id", newgetSingleBook);
router.post("/accesscode", getaccessCode);
router.get("/accesscode/:id", getcurrentaccessCode);
router.post("/create-access-code", createaccesscode);

export default router;
