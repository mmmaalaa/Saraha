import UserModel from "../../DB/models/user.model.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import appError from "../../utils/appError.js";
import emailEmitter from "../../utils/emailEvent.js";
import { comparePassword } from "../../utils/hashing.js";
import { setAuthCookie } from "../../utils/setAuthCookie.js";
import { generateToken, verifyToken } from "../../utils/tokens.js";

// Helper function to create a user response object
const createUserResponse = (user) => ({
  email: user.email,
  username: user.username,
});

// Helper function to create errors
const createError = (message, statusCode) => {
  return new appError().create(message, statusCode);
};

export const register = asyncHandler(async (req, res, next) => {
  const user = await UserModel.create(req.body);
  emailEmitter.emit("sendEmail", user);

  res.status(201).json({
    status: "success",
    data: createUserResponse(user),
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return next(createError("Invalid email or password", 401));
  }

  const isPasswordValid = comparePassword(password, user.password);
  if (!isPasswordValid) {
    return next(createError("Invalid email or password", 401));
  }

  if (!user.isActive) {
    return next(createError("Please activate your account first", 401));
  }

  const token = generateToken({ userId: user._id });
  setAuthCookie(res, token);

  return res.status(200).json({
    status: "success",
    message: "Login successful",
    data: createUserResponse(user),
  });
});

export const activateAccount = asyncHandler(async (req, res, next) => {
  const { token } = req.params;

  const { userId } = verifyToken(token);
  const user = await UserModel.findById(userId);

  if (!user) {
    return next(createError("User not found", 404));
  }

  if (user.isActive) {
    return next(createError("Account is already activated", 400));
  }

  user.isActive = true;
  await user.save();

  return res.status(200).json({
    status: "success",
    message: "Account activated successfully",
  });
});

export const reSendEmail = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return next(createError("User not found", 404));
  }

  if (user.isActive) {
    return next(createError("Account is already activated", 400));
  }

  emailEmitter.emit("sendEmail", user);

  return res.status(200).json({
    status: "success",
    message: "Activation email has been resent successfully",
  });
});
