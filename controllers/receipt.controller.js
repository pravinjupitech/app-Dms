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
    const { created_by } = req.params;
    const receipt = await Receipt.find({ created_by: created_by });
    return receipt.length > 0
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
    const { created_by } = req.params;
    const ExistingData = await Receipt.find({ created_by: created_by });
    const flatData = ExistingData.flatMap((item) => item.receipts);

    const totalCredit = flatData.reduce((acc, num) => {
      if (num.mode === "receipt") {
        return acc + num.amount;
      }
      return acc;
    }, 0);

    const totaldebit = flatData.reduce((acc, num) => {
      if (num.mode === "payment") {
        return acc + num.amount;
      }
      return acc;
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

export const updateReceipt = async (req, res, next) => {
  try {
    const { id, innerId } = req.params;
    const existingReceipt = await Receipt.findById(id);
    if (existingReceipt) {
      const findIndex = existingReceipt.receipts.findIndex(
        (item) => item._id.toString() === innerId
      );
      if (findIndex !== -1) {
        existingReceipt.receipts[findIndex] = {
          ...existingReceipt.receipts[findIndex]._doc,
          ...req.body,
        };
        await existingReceipt.save();
        res.status(200).json({ message: "Data Updated", status: true });
      } else {
        return res
          .status(404)
          .json({ message: " Inner Data Not Found", status: false });
      }
    } else {
      res.status(404).json({ message: "Not Found", status: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      status: false,
    });
  }
}; //

export const deleteReceipt = async (req, res, next) => {
  try {
    const { id, innerId } = req.params;
    const existingReceipt = await Receipt.findById(id);
    if (existingReceipt) {
      const findIndex = existingReceipt.receipts.findIndex(
        (item) => item._id.toString() === innerId
      );
      if (findIndex !== -1) {
        existingReceipt.receipts.splice(findIndex, 1);
        await existingReceipt.save();
        if (existingReceipt.receipts.length === 0) {
          await Receipt.findByIdAndDelete(id);
          res.status(200).json({ message: "Data Deleted", status: true });
        }
        res.status(200).json({ message: "Inner Data Deleted", status: true });
      } else {
        res.status(404).json({ messae: "Inner Data Not Found", status: false });
      }
    } else {
      res.status(404).json({ message: "Not Found", status: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      status: false,
    });
  }
};