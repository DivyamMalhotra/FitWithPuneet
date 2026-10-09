import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.get("/health", (_, res) => res.send("ok"));
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

export default app;
