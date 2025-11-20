import asyncHandler from "../../middleware/asyncHandler.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  const { user } = req;
  return res.status(200).json({
    status: "success",
    data: user,
  });
});
