import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema({
  walletBalance: {
    type: Number,
    default: 0.0,
  },
  depositAmount: {
    type: Number,
    default: 0.0,
  },
  interest: {
    type: Number,
    default: 0.0,
  },
  percentageInterest: {
    type: Number,
    default: 0.0,
  },
  plan: {
    type: String,
    default: "No plan yet",
  },
});

const Investment =
  mongoose.models.investments ||
  mongoose.model("investments", investmentSchema);

export default Investment;
