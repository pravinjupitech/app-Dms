import mongoose from "mongoose";
const receiptSchema = new mongoose.Schema(
  {
    receipts: [
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
      },
    ],
    created_by: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Receipt = mongoose.model("receipt", receiptSchema);
