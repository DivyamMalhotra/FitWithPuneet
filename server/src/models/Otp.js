import mongoose from "mongoose";

export default mongoose.model(
  "Otp",
  new mongoose.Schema({
    mobile: { type: String, required: true, index: true },
    name: String,
    hash: String,
    attempts: { type: Number, default: 0 },
    expiresAt: { type: Date, index: { expires: 0 } },
  })
);
