import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import voterRoutes from "./modules/voter/voter.routes.js";

import { errorHandler } from "./middlewares/error.middleware.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/voters", voterRoutes);

app.get("/health", (req, res) => {
  res.json({ message: "OK" });
});

app.use(errorHandler);

export default app;
