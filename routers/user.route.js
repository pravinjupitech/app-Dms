import express from "express";
import {
  login,
  signup,
  updateUserstatus,
  userList,
} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/view", userList);
router.post("/update-status/:id", updateUserstatus);
export default router;
