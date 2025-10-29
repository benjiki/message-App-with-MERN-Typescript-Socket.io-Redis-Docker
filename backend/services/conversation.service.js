import Conversation from "../models/Conversation.js";
import FriendShip from "../models/Friendship.js";
import User from "../models/Users.js";
import AppError from "../utils/AppError.js";

export const connectionCheck = async ({ userId, connectCode }) => {
  const friend = await User.findOne({ connectCode });

  if (!friend || friend._id.toString() === userId.toString()) {
    throw new AppError("Invalid connect ID", 400);
  }

  const existingFriendship = await FriendShip.findOne({
    $or: [
      { requester: userId, recipient: friend._id },
      { requester: friend._id, recipient: userId },
    ],
  });

  if (existingFriendship) {
    throw new AppError("Friendship already exists", 400);
  }
  return existingFriendship;
};

export const getConversationService = async ({ userId }) => {
  const friendships = await FriendShip.find({
    $or: [{ requester: userId }, { recipient: userId }],
  })
    .populate([
      { path: "requester", select: "id fullName username connectCode" },
      { path: "recipient", select: "id fullName username connectCode" },
    ])
    .lean();

  if (!friendships.length) return [];

  const friendIds = friendships.map((friend) =>
    friend.requester._id.toString() === userId.toString()
      ? friend.recipient._id.toString()
      : friend.requester._id.toString()
  );

  const conversations = await Conversation.find({
    participants: { $all: [userId], $in: friendIds },
  }).lean();

  const conversationsMap = new Map();

  conversations.forEach((conversation) => {
    const friendId = conversation.participants.find(
      (p) => p.toString() !== userId.toString()
    );
    conversationsMap.set(friendId.toString(), conversation);
  });

  // Build conversation data
  const conversationData = await Promise.all(
    friendships.map(async (friendship) => {
      const inRequester =
        friendship.requester._id.toString() === userId.toString();
      const friend = inRequester ? friendship.recipient : friendship.requester;
      const conversation = conversationsMap.get(friend._id.toString());

      return {
        friend: {
          id: friend._id.toString(),
          username: friend.username,
          fullName: friend.fullName,
          connectCode: friend.connectCode,
          online: false,
        },
        conversation: conversation
          ? {
              conversationId: conversation._id.toString(),
              lastMessage: conversation.lastMessage || null,
              unreadCounts: {
                [conversation.requester.toString()]:
                  conversation.unreadCount?.get(
                    conversation.requester.toString()
                  ) || 0,
                [conversation.recipient.toString()]:
                  conversation.unreadCount?.get(
                    conversation.recipient.toString()
                  ) || 0,
              },
            }
          : null,
      };
    })
  );

  return conversationData;
};
