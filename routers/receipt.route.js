import express from "express";
import { saveReceipt, viewReceipt } from "../controllers/receipt.controller.js";
const router = express.Router();

router.post("/save", saveReceipt);
router.get("/view", viewReceipt);
export default router;
