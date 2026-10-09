import { Router } from "express";
import User from "../models/User.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const r = Router();

r.get("/users", requireAdmin, async (_req, res) => {
  const users = await User.find({}, "name mobile createdAt updatedAt").sort({ createdAt: -1 }).limit(5000).lean();
  res.json({ users });
});

export default r;
