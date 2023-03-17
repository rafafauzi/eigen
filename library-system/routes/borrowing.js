import express from "express";
import {
  borrowingBook,
  returningBook,
  getBorrows,
} from "../controllers/borrowing.js";

const router = express.Router();

router.get("/borrows", getBorrows);
router.post("/borrowing", borrowingBook);
router.post("/returning", returningBook);

export default router;
