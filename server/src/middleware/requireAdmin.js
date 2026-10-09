import jwt from "jsonwebtoken";

export const isAdminMobile = (m) =>
  (process.env.ADMIN_MOBILES || "").split(",").map((s) => s.trim()).filter(Boolean).includes(m);

export function requireAdmin(req, res, next) {
  const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  try {
    const p = jwt.verify(token, process.env.JWT_SECRET);
    if (!isAdminMobile(p.mobile)) return res.status(403).json({ message: "Admin only." });
    req.admin = p;
    next();
  } catch {
    res.status(401).json({ message: "Please log in again." });
  }
}
