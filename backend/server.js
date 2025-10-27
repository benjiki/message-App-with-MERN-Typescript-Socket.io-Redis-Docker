import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());

try {
  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
  });
} catch (error) {
  console.error("The sever failed to start", error);
  process.exit(1);
}
