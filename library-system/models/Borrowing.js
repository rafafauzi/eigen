import mongoose from "mongoose";

const BorrowingSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrowed_at: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Borrowing = mongoose.model("Borrowing", BorrowingSchema);
export default Borrowing;
