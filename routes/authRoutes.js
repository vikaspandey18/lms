import express from "express";
import {
  loginvalidator,
  regitervalidator,
} from "../middlewares/authMiddleware.js";
import {
  logincontroller,
  logoutcontroller,
  registercontroller,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginvalidator, logincontroller);
router.post("/register", regitervalidator, registercontroller);
router.get("/logout", logoutcontroller);

export default router;
