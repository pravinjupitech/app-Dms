import mongoose from "mongoose";
const receiptSchema = new mongoose.Schema(
  {
    party: {
      type: String,
    },
    date: {
      type: String,
    },
    amount: {
      type: Number,
    },
    mode: {
      type: String,
    },
    note: {
      type: String,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Receipt = mongoose.model("receipt", receiptSchema);
