import { EventEmitter } from "events";
import { generateToken } from "./tokens.js";
import sendEmail, { subject } from "./sendEmail.js";
import sendEmailTemplate from "./sendEmailTemplate.js";

const emailEmitter = new EventEmitter();
emailEmitter.on("sendEmail", async (user) => {
  const token = generateToken({ userId: user._id });
  const link = `http://localhost:3000/api/v1/auth/activateAccount/${token}`;
  await sendEmail(
    user.email,
    subject.activateAccount,
    sendEmailTemplate(user.username, link)
  );
});



export default emailEmitter;