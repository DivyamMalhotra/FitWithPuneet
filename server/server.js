import "dotenv/config";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error("Missing MONGO_URI or JWT_SECRET in server/.env");
  process.exit(1);
}

connectDB()
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => console.log("Server running"));
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });
