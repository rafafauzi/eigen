import express from "express";
import {
  addBook,
  getAllBooks,
  deleteBook,
  getAllBooksNoFilter,
} from "../controllers/book.js";

const router = express.Router();

router.post("/add", addBook);
router.get("/books", getAllBooks);
router.get("/books-all", getAllBooksNoFilter);
router.delete("/delete/:id", deleteBook);

export default router;
