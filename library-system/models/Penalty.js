import mongoose from "mongoose";

const PenaltySchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
});

const Penalty = mongoose.model("Penalty", PenaltySchema);
export default Penalty;
