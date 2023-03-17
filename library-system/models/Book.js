import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    genre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);
export default Book;

//   {
//         code: "JK-45",
//         title: "Harry Potter",
//         author: "J.K Rowling",
//         stock: 1
//     },
