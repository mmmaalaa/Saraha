import MessageModel from "../../DB/models/message.model.js";
import UserModel from "../../DB/models/user.model.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import appError from "../../utils/appError.js";
export const createMessage = asyncHandler(async (req, res, next) => {
  const { receiver, content } = req.body;
  const sender = req.user._id;
  const user = await UserModel.findById(receiver);
  if (!user) {
    const error = new appError().create("user not found", 404);
    return next(error);
  }
  const message = await MessageModel.create({
    sender,
    receiver,
    content,
  });
  return res.status(201).json({ status: true, data: message });
});

export const getMessages = asyncHandler(async (req, res, next) => {
  const user = req.user._id;
  const userStatus = req.query.userStatus;
  let messages = null;
  if (userStatus === "sender") {
    messages = await MessageModel.find({ sender: user });
  }
  if (userStatus === "receiver") {
    messages = await MessageModel.find({ receiver: user });
  }
  // const userStatus = req.user._id === messages.sender ? "sender" : "reciver";
  return res.status(200).json({ status: true, data: messages });
});

export const getSingleMessage = asyncHandler(async (req, res, next) => {
  const user = req.user._id;
  const message = await MessageModel.findById(req.params.id);
  if (!message) {
    const error = new appError().create("message not found", 404);
    return next(error);
  }
  if (
    message.sender.toString() !== user.toString() &&
    message.receiver.toString() !== user.toString()
  ) {
    const error = new appError().create("unauthorized", 401);
    return next(error);
  }

  return res.status(200).json({ status: true, data: message });
});
