import jwt from "jsonwebtoken";
import User from "../models/Users.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized Access" });
  }
};
export default authMiddleware;
