import { User } from "../models/user.model.js";

export const signup = async (req, res, next) => {
  try {
    const { username } = req.body;
    const existUser = await User.findOne({ username });
    if (existUser) {
      return res
        .status(404)
        .json({ message: "Email Alredy Exist", status: false });
    }
    const user = await User.create(req.body);
    return user
      ? res.status(200).json({ message: "User Registered", status: true })
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

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username, status: "Active" });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Unauthorized User", status: false });
    }
    if (user.password !== password) {
      return res.status(404).json({ message: "Bad Request", status: false });
    }
    res.status(200).json({
      message: "Login Successfully",
      user: { ...user.toObject(), password: undefined },
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
