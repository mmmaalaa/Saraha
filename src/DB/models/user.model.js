import { model, Schema } from "mongoose";
import { hashPassword } from "../../utils/hashing.js";
const userSchema = new Schema(
  {
    username: { type: String, required: [true, "user name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exist"],
      match: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  this.password = hashPassword(this.password);
  next();
});
const UserModel = model("User", userSchema);

export default UserModel;
