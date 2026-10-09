import mongoose from "mongoose";

export default mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: { type: String, required: true, trim: true },
      mobile: { type: String, required: true, unique: true, match: /^[6-9]\d{9}$/ },
    },
    { timestamps: true }
  )
);
