import { Router } from "express";
import { sendOtp, verifyOtp } from "../controllers/authController.js";
import { otpLimiter } from "../middleware/rateLimiter.js";

const r = Router();
r.post("/send-otp", otpLimiter, sendOtp);
r.post("/verify-otp", verifyOtp);

export default r;
