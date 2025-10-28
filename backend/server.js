// backend\server.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { connectDB } from "./utils/db.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

// Middleware
app.use(express.json());

// ✅ CORS must allow credentials for cookies to work
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.replace(/\/$/, ""), // remove trailing slash if any
    credentials: true,
  })
);

// ✅ Parse cookies BEFORE routes
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRouter);

// ✅ Error handler should come LAST
app.use(errorHandler);

try {
  await connectDB();

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
} catch (error) {
  console.error("The server failed to start", error);
  process.exit(1);
}
