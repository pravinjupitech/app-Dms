import express from "express";
import { save, view } from "../controllers/ledger.controller.js";

const router = express.Router();

router.post("/save-ledger", save);
router.get("/view-ledger", view);
export default router;
