import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
    IPAddress: {
      type: String,
    },
    IMENumber: {
      type: String,
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("user", userSchema);
