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
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.replace(/\/$/, ""), // remove trailing slash if any
    credentials: true,
  })
);

app.use(errorHandler);
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use(errorHandler);
try {
  await connectDB();

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
  });
} catch (error) {
  console.error("The sever failed to start", error);
  process.exit(1);
}
