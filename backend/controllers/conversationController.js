import * as conversationService from "../services/conversation.service.js";
import { checkConnectionCodeValidationSchema } from "../validators/Conversation.validation.js";
class ConversationController {
  static async checkConnectionCode(req, res, next) {
    try {
      const { error, value } = checkConnectionCodeValidationSchema.validate(
        req.query,
        {
          abortEarly: false,
        }
      );

      if (error) {
        const messages = error.details.map((err) => err.message);
        throw new AppError(messages.join(", "), 400);
      }
      const { connectCode } = value; // safe validated value

      const connectionChecker = await conversationService.connectionCheck({
        userId: req.user._id,
        connectCode,
      });

      res.json({
        success: true,
        message: "Connect ID is Valid",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getConversations(req, res, next) {
    try {
      const getConvo = await conversationService.getConversationService({
        userId: req.user._id,
      });

      res.json({ data: getConvo });
    } catch (error) {
      next(error);
    }
  }
}
