import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", MemberSchema);
export default Member;
