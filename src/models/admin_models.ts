import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  authentication: {
    password: { type: String, select: false },
    salt: { type: String, select: false },
    session_token: { type: String, select: false },
  },
});

export const AdminModel = mongoose.model("Admin", adminSchema);
