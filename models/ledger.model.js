import mongoose from "mongoose";
const ledgerSchema = new mongoose.Schema(
  {
    debit: {
      type: Number,
    },
    credit: {
      type: Number,
    },
    party: {
      type: String,
    },
    date: {
      type: String,
    },
    balance: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Ledger = mongoose.model("ledger", ledgerSchema);
