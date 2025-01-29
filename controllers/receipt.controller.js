import { Receipt } from "../models/receipt.model.js";

export const saveReceipt = async (req, res, next) => {
  try {
    const receipt = await Receipt.create(req.body);
    return receipt
      ? res.status(200).json({ message: "Data Saved", status: true })
      : res
          .status(404)
          .json({ message: "Something Went Wrong", status: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: message.error,
      status: false,
    });
  }
};

export const viewReceipt = async (req, res, next) => {
  try {
    const receipt = await Receipt.find({}).sort({ sortOrder: 1 });
    return receipt
      ? res.status(200).json({ message: "Data Found", receipt, status: true })
      : res.status(404).json({ message: "Not Found", status: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      status: false,
    });
  }
};

export const dashboardTotal = async (req, res, next) => {
  try {
    const [creditReceipt, debitReceipt] = await Promise.all([
      Receipt.find({ mode: "receipt" }),
      Receipt.find({ mode: "payment" }),
    ]);
    const totalCredit = creditReceipt.reduce((acc, num) => {
      return acc + num.amount;
    }, 0);
    const totaldebit = debitReceipt.reduce((acc, num) => {
      return acc + num.amount;
    }, 0);
    const totalBalance = totalCredit - totaldebit;
    res.status(200).json({
      message: "Total Balance Found",
      data: { totalCredit, totaldebit, totalBalance },
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      status: false,
    });
  }
};
