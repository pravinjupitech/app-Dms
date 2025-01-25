import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    IPAddress: {
      type: String,
    },
    IMENumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("user", userSchema);
