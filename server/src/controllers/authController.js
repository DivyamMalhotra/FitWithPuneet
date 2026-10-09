import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import { sendSms } from "../utils/sendOtp.js";
import { isAdminMobile } from "../middleware/requireAdmin.js";

const hash = (m, o) => crypto.createHmac("sha256", process.env.JWT_SECRET).update(m + o).digest("hex");
const valid = (m) => /^[6-9]\d{9}$/.test(m);

export async function sendOtp(req, res) {
  const { name, mobile } = req.body;
  if (!name || name.trim().length < 2 || !valid(mobile))
    return res.status(400).json({ message: "Invalid name or mobile number." });

  const otp = String(crypto.randomInt(100000, 1000000));
  await Otp.deleteMany({ mobile });
  await Otp.create({
    mobile,
    name: name.trim(),
    hash: hash(mobile, otp),
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  try {
    await sendSms(mobile, otp);
  } catch {
    return res.status(502).json({ message: "SMS failed. Try again." });
  }
  res.json({ message: "OTP sent" });
}

export async function verifyOtp(req, res) {
  const { mobile, otp } = req.body;
  const rec = await Otp.findOne({ mobile });
  if (!rec) return res.status(400).json({ message: "OTP expired. Request a new one." });

  if (rec.attempts >= 5) {
    await rec.deleteOne();
    return res.status(429).json({ message: "Too many wrong tries. Request a new OTP." });
  }
  if (rec.hash !== hash(mobile, String(otp))) {
    rec.attempts++;
    await rec.save();
    return res.status(400).json({ message: "Wrong OTP." });
  }

  const user = await User.findOneAndUpdate(
    { mobile },
    { name: rec.name, mobile },
    { upsert: true, new: true }
  );
  await rec.deleteOne();
  const token = jwt.sign({ id: user._id, mobile }, process.env.JWT_SECRET, { expiresIn: "30d" });
  res.json({ token, user: { name: user.name, mobile: user.mobile, isAdmin: isAdminMobile(user.mobile) } });
}
