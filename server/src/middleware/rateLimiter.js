import rateLimit from "express-rate-limit";

export const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: { message: "Too many OTP requests. Try after 10 minutes." },
});
