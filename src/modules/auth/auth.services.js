import UserModel from "../../DB/models/user.model.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import appError from "../../utils/appError.js";
import { comparePassword } from "../../utils/hashing.js";
import sendEmail, { subject } from "../../utils/sendEmail.js";
import sendEmailTemplate from "../../utils/sendEmailTemplate.js";
import { setAuthCookie } from "../../utils/setAuthCookie.js";
import { generateToken } from "../../utils/tokens.js";
import { verifyToken } from "../../utils/tokens.js";
// ? Helper function to create a user response object
const createUserResponse = (user) => ({
  email: user.email,
  username: user.username,
});

export const register = asyncHandler(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    const error = new appError().create("Passwords do not match", 400);
    return next(error);
  }

  const user = await UserModel.create({ username, email, password });
  const token = generateToken({ userId: user._id });
  
  const link = `http://localhost:3000/api/v1/auth/activateAccount/${token}`;
  await sendEmail(
    email,
    subject.activateAccount,
    sendEmailTemplate(username, link)
  );

  res.status(201).json({
    status: "success",
    data: createUserResponse(user),
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    const error = new appError().create("Invalid email or password", 401);
    return next(error);
  }
  const isPasswordValid = comparePassword(password, user.password);
  if (!isPasswordValid) {
    const error = new appError().create("Invalid email or password", 401);
    return next(error);
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
  console.log(req.params)
  // const token = req.params;
  // console.log(token);
  // const { userId } = verifyToken(token);
  // console.log(userId);
  // const user = await UserModel.findById(userId).select("-password -__v");
  // user.isActive = true;
  // await user.save();
  // return res
  //   .status(200)
  //   .json({ success: true, message: "user activate successfully" });
});
