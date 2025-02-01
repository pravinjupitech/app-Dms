import express from "express";
import {
  forgetPassword,
  login,
  resetOtpVerify,
  signup,
  updatePassword,
  updateUserstatus,
  userList,
} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/view", userList);
router.post("/update-status/:id", updateUserstatus);
router.post("/forget-password", forgetPassword);
router.post("/reset-otp", resetOtpVerify);
router.post("/update-password/:id", updatePassword);
export default router;
