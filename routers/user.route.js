import express from "express";
import {
  forgetPassword,
  login,
  resetOtpVerify,
  signup,
  updatePassword,
  updateUser,
  updateUserstatus,
  userList,
  viewByIdUser,
} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/view", userList);
router.post("/update-status/:id", updateUserstatus);
router.post("/forget-password", forgetPassword);
router.post("/reset-otp", resetOtpVerify);
router.put("/update-password/:id", updatePassword);
router.put("/update-user/:id", updateUser);
router.get("/view-by-id/:id", viewByIdUser);
export default router;
