import UserModel from "../../DB/models/user.model.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import appError from "../../utils/appError.js";

export const register = asyncHandler(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    const error = new appError().create("Passwords do not match", 400);
    return next(error);
  }
  const user = await UserModel.create({ username, email, password });

  res
    .status(201)
    .json({
      status: "success",
      data: { email: user.email, username: user.username },
    });
});
export const login = asyncHandler(async (req, res, next) => {});
