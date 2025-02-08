import { User } from "../models/user.model.js";
import transporter from "../services/email.js";

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

export const userList = async (req, res, next) => {
  try {
    const users = await User.find(); //.select("-password");
    return users.length > 0
      ? res.status(200).json({ message: "Data Found", users, status: true })
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

export const updateUserstatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Not Found", status: false });
    }
    user.status = status;
    await user.save();
    res.status(200).json({ message: "Status Updated", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      status: false,
    });
  }
};

const resetOTP = {};
export const forgetPassword = async (request, response, next) => {
  try {
    const { email } = request.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    resetOTP[email] = otp;
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }
    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Confirmation",
      html: `
        <div style="font-family: Helvetica, Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); line-height: 1.5;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #00466a; font-size: 24px; margin: 0;">DMS SERVICES</h1>
            <p style="font-size: 16px; color: #333;">Password Reset Successful</p>
          </div>
          <div style="padding: 10px 20px; font-size: 14px; color: #555;">
            <p>Dear User,</p>
            <p>Your password for the <strong>DMS SERVICES</strong> account has been successfully reset. Please use the following OTP to proceed:</p>
            <div style="text-align: center; margin: 20px 0;">
              <h2 style="display: inline-block; padding: 10px 20px; background-color: #00466a; color: white; border-radius: 5px; font-size: 22px; letter-spacing: 1.5px;">${otp}</h2>
            </div>
            <p>If you did not request this change, please contact our support team immediately.</p>
            <p>Regards,<br><strong>Dms Services</strong></p>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <div style="text-align: center; font-size: 12px; color: #aaa;">
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      !error
        ? response.status(201).json({
            user: user,
            message: "send otp on email",
            status: true,
          })
        : console.log(error) ||
          response.json({ error: "something went wrong" });
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server error" });
  }
};

export const resetOtpVerify = async (req, res, next) => {
  try {
    const { otp, email } = req.body;
    if (otp == resetOTP[email]) {
      delete resetOTP[email];
      return res
        .status(201)
        .json({ message: "otp matched successfully", status: true });
    } else {
      return res.status(400).json({ error: "Invalid otp", status: false });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error...", status: false });
  }
};

export const updatePassword = async (request, response, next) => {
  try {
    const userId = request.params.id;
    if (request.body.password !== request.body.confirmPassword) {
      return response
        .status(400)
        .json({ error: "Password don't match", status: false });
    } else {
      // request.body.password = await bcryptjs.hash(
      //   request.body.password,
      //   await bcryptjs.genSalt(10)
      // );
      const user = await User.updateMany(
        { _id: userId },
        { password: request.body.password },
        { new: true }
      );
      if (user.modifiedCount > 0)
        return response
          .status(200)
          .json({ Message: "Password Updated Success", status: true });
      return response
        .status(400)
        .json({ Message: "Unauthorized User...", status: false });
    }
  } catch (err) {
    console.log(err);
    return response
      .status(500)
      .json({ Message: "Internal Server Error...", status: false });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "Not Found", status: false });
    }
    await User.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: "Data Updated", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", status: false });
  }
};

export const viewByIdUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return user
      ? res.status(200).json({ message: "Data Found", user, status: true })
      : res.status(404).json({ message: "Not Found", status: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      statua: false,
    });
  }
};
