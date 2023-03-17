import Book from "../models/Book.js";
import Member from "../models/Member.js";
import Borrowing from "../models/Borrowing.js";
import Penalty from "../models/Penalty.js";
import moment from "moment";

export const borrowingBook = async (req, res) => {
  try {
    const { memberId, bookId } = req.body;

    // Check if member exists
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    // Check if the book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if book is not borrowed by other members
    const borrowedBook = await Borrowing.findOne({ book });
    if (borrowedBook) {
      return res
        .status(400)
        .json({ message: "Book is already borrowed by another member" });
    }
    // Check if the member has any penalties
    const now = new Date();
    const penalties = await Penalty.find({ member, end_date: { $gte: now } });
    if (penalties.length > 0) {
      return res
        .status(400)
        .json({ message: "Member has penalties and cannot borrow books" });
    }
    // Check if member has already borrowed 2 books
    const borrowings = await Borrowing.find({ member });
    if (borrowings.length >= 2) {
      return res
        .status(400)
        .json({ message: "you have already borrowed 2 books" });
    }

    // Create new borrowing
    const borrowing = new Borrowing({
      member,
      book,
      borrowed_at: new Date(),
    });
    const savedBorrowing = await borrowing.save();

    // Decrease book stock by 1
    book.stock -= 1;
    await book.save();

    res.status(201).json(savedBorrowing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const returningBook = async (req, res) => {
  try {
    const { memberId, bookId } = req.body;

    // Find the borrowing record for the member and book
    const borrowing = await Borrowing.findOne({
      member: memberId,
      book: bookId,
    });

    // If the borrowing record doesn't exist, return an error
    if (!borrowing) {
      return res
        .status(404)
        .json({ message: "Book not borrowed by the member" });
    }

    // Check if the book is returned after 7 days
    const returnDate = new Date();
    const borrowingDate = new Date(borrowing.borrowed_at);
    const timeDiff = returnDate.getTime() - borrowingDate.getTime();
    const diffDays = timeDiff / (1000 * 3600 * 24);

    if (diffDays > 7) {
      // Calculate the penalty start date and end date
      const startDate = moment(returnDate)
        .add(1, "days")
        .startOf("day")
        .toDate();
      const endDate = moment(startDate).add(3, "days").endOf("day").toDate();

      // Create a new penalty record for the member
      const penalty = new Penalty({
        member: memberId,
        start_date: startDate,
        end_date: endDate,
      });
      await penalty.save();

      res.status(400).json({
        message:
          "Book returned successfully after 7 days. Penalty imposed for 3 days",
      });
    }
    // Decrease book stock by 1
    const book = await Book.findById(bookId);
    book.stock += 1;
    await book.save();
    //delete the borrowing after it returned
    await Borrowing.deleteOne({ _id: borrowing._id });
    res.status(200).json({ message: "Book returned successfully", book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBorrows = async (req, res) => {
  try {
    const borrows = await Borrowing.find();

    res.status(201).json(borrows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
