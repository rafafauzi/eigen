import Member from "../models/Member.js";
import Borrowing from "../models/Borrowing.js";

export const addMember = async (req, res) => {
  try {
    const { code, name, email, password } = req.body;
    const newMember = new Member({ code, name, email, password });
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const memberId = req.params.id;
    const deletedMember = await Member.findByIdAndDelete(memberId);
    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json(deletedMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();

    const membersWithBorrowedBooks = [];

    for (const member of members) {
      const borrowings = await Borrowing.find({ member: member._id });
      const borrowedBooksCount = borrowings.length;
      membersWithBorrowedBooks.push({
        ...member.toObject(),
        borrowedBooksCount,
      });
    }

    res.status(200).json(membersWithBorrowedBooks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
