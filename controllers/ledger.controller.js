import { Ledger } from "../models/ledger.model.js";

export const save = async (req, res, next) => {
  try {
    const ledger = await Ledger.create(req.body);
    return ledger
      ? res.status(200).json({ message: "Data Added", status: true })
      : res
          .status(404)
          .json({ message: "Something Went Wrong", status: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      status: false,
    });
  }
};

export const view = async (req, res, next) => {
  try {
    const ledger = await Ledger.find({});
    return ledger.length > 0
      ? res.status(200).json({ message: "Data Found", ledger, status: true })
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
