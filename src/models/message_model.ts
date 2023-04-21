import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  message: { type: String, require: true },
  authetication: {
    password: { type: String, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const MessageModel = mongoose.model("Message", messageSchema);
