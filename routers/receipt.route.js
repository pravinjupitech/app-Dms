import express from "express";
import {
  dashboardTotal,
  saveReceipt,
  viewReceipt,
} from "../controllers/receipt.controller.js";
const router = express.Router();

router.post("/save", saveReceipt);
router.get("/view/:created_by", viewReceipt);
router.get("/dashboard-balance/:created_by", dashboardTotal);
export default router;
