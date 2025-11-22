import { model, Schema, Types } from "mongoose";

const messageSchema = new Schema(
  {
    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      minlength: [5, "message must at least 5 character"],
      maxlength: [500, "message must at most 500 character"],
    },
  },
  { timestamps: true }
);

const MessageModel = model("Message", messageSchema);
export default MessageModel;
