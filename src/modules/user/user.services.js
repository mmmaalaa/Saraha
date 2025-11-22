import UserModel from "../../DB/models/user.model.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import appError from "../../utils/appError.js";
import { comparePassword, hashPassword } from "../../utils/hashing.js";
import sendEmail from "../../utils/sendEmail.js";
import crypto from "node:crypto";
export const getUserProfile = asyncHandler(async (req, res) => {
  const { user } = req;
  return res.status(200).json({
    status: "success",
    data: user,
  });
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user._id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password -__v -_id -email -createdAt -updatedAt -isActive");
  return res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

export const updateEmail = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { newEmail } = req.body;
  const exists = await UserModel.findOne({ email: newEmail });
  if (exists) {
    const error = new appError().create("email already exist", 400);
    return next(error);
  }
  const user = await UserModel.findById(userId);
  const token = crypto.randomBytes(32).toString("hex");
  user.pendingEmail = newEmail;
  user.emailToken = token;
  user.pendingEmailExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save();
  const link = `${process.env.CLIENT_URL}user/activateEmail/${token}`;
  await sendEmail(
    newEmail,
    "Confir your new email",
    `<h1>click <a href="${link}">here</a> to confirm your new email</h1>`
  );
  return res.status(201).json({
    status: "success",
    message: "verification Sent",
  });
});

export const activateEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const user = await UserModel.findOne({
    emailToken: token,
  });
  if (!user) {
    const error = new appError().create("Invalid or expired token", 404);
    return next(error);
  }
  user.email = user.pendingEmail;
  user.emailToken = undefined;
  user.pendingEmail = undefined;
  user.pendingEmailExpires = undefined;
  user.isActive = true;
  await user.save();
  return res.status(200).json({
    status: "success",
    message: "email activated",
  });
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = await UserModel.findById(req.user._id);
  if (!comparePassword(oldPassword, user.password)) {
    const error = new appError().create("Invalid password", 400);
    return next(error);
  }
  
  user.password = newPassword;
  await user.save();
  return res.status(200).json({
    status: "success",
    message: "password updated",
  });
});
