import {
  userRegistationValidationSchema,
  userLoginValidationSchema,
} from "../validators/User.validation.js";
import * as authService from "../services/auth.service.js";
import AppError from "../utils/AppError.js";

class AuthController {
  static async register(req, res, next) {
    try {
      const { error, value } = userRegistationValidationSchema.validate(
        req.body,
        {
          abortEarly: false,
        }
      );

      if (error) {
        const messages = error.details.map((err) => err.message);
        throw new AppError(messages.join(", "), 400);
      }
      const registeredUser = await authService.regUser(value);

      res.status(201).json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { error, value } = userLoginValidationSchema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const messages = error.details.map((err) => err.message);
        return res.status(400).json({ errors: messages });
      }
      const { token, user } = await authService.loginUser(value);

      res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
      res.status(201).json({
        user: {
          id: user.id,
          username: user.email,
          fullname: user.fullName,
          email: user.email,
          connecCode: user.connectCode,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async me(req, res, next) {
    try {
      const user = await authService.meService(req.user.id);
      res.status(201).json({
        user: {
          id: user.id,
          username: user.email,
          fullname: user.fullName,
          email: user.email,
          connecCode: user.connectCode,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async logout(req, res) {}
}
export default AuthController;
