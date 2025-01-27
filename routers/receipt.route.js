import express from "express";
import {
  dashboardTotal,
  saveReceipt,
  viewReceipt,
} from "../controllers/receipt.controller.js";
const router = express.Router();

router.post("/save", saveReceipt);
router.get("/view", viewReceipt);
router.get("/dashboard-balance", dashboardTotal);
export default router;
