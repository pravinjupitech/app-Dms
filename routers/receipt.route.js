import express from "express";
import {
  dashboardTotal,
  deleteReceipt,
  saveReceipt,
  updateReceipt,
  viewReceipt,
} from "../controllers/receipt.controller.js";
const router = express.Router();

router.post("/save", saveReceipt);
router.get("/view/:created_by", viewReceipt);
router.get("/dashboard-balance/:created_by", dashboardTotal);
router.put("/update/:id/:innerId", updateReceipt);
router.delete("/delete/:id/:innerId", deleteReceipt);
export default router;
