import Book from "../models/Book.js";

export const addBook = async (req, res) => {
  try {
    const { code, title, author, genre, description, stock } = req.body;
    const newBook = new Book({
      code,
      title,
      author,
      genre,
      description,
      stock,
    });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(deletedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    const filteredBooks = books.filter((book) => book.stock > 0);
    res.status(200).json(filteredBooks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllBooksNoFilter = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
