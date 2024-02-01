import express from "express";
import { getusercontroller } from "../controllers/accessController.js";

const router = express.Router();

router.get("/getuser", getusercontroller);

export default router;
