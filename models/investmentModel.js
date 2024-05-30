import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
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
  bitcoinWalletAddress: {
    type: String,
    default: "",
  },
});

const Investment =
  mongoose.models.investments ||
  mongoose.model("investments", investmentSchema);

export default Investment;
