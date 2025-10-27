import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import generateUniqueConnectCode from "../utils/gemerateUniqeCode.js";
import AppError from "../utils/AppError.js";
export const regUser = async (data) => {
  const { fullName, username, email, password } = data;
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new AppError("User already exists with this username or email", 400);
  }

  //   hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    username,
    fullName,
    email,
    password: hashedPassword,
    connectCode: await generateUniqueConnectCode(),
  });

  return await user.save();
};

export const loginUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new AppError("Invalid credientials");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new AppError("Invalid credientials");
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return { token, user };
};

export const meService = async (data) => {
  const user = await User.findById(data).select("-password");

  if (!user) {
    throw new AppError("User not found");
  }
  return user;
};
