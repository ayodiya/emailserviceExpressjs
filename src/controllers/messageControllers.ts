import { Request, Response } from "express";
import Message, { IMessage } from "../models/Message";
import User, { IUser } from "../models/User";

export const sendMessage = async (req: Request, res: Response) => {
  const { receiver, subject, content, isRead, sender } = req.body;

  try {
    const receiverExist = await User.findOne({ name: receiver.toLowerCase() });

    if (!receiverExist) {
      return res.status(400).json({
        status: "failed",
        msg: "Receiver with the name does not exists",
      });
    }

    const newMessage = await Message.create({
      receiver,
      subject,
      content,
      isRead,
      sender,
    } as IMessage);

    receiverExist.totalMessages += 1;
    receiverExist.totalUnreadMessages += 1;

    await receiverExist.save();

    res.status(201).json({
      status: "success",
      msg: "Message sent successfully",
      newMessage,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      msg: "Server error, please try again",
    });
  }
};

export const getUserMessages = async (req: Request, res: Response) => {
  const { user } = req.params;

  try {
    const allMessages = await Message.find({ receiver: user.toLowerCase() });

    res.status(200).json({
      status: "success",
      msg: `${user} messages fetched successfully`,
      allMessages,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      msg: "Server error, please try again",
    });
  }
};

export const setMessageRead = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const messageExists = await Message.findById(id);

    if (!messageExists) {
      return res.status(400).json({
        status: "failed",
        msg: "Message does not exists",
      });
    }

    const findUser = await User.findOne({ name: messageExists?.receiver });

    if (!findUser) {
      return res.status(400).json({
        status: "failed",
        msg: "User not found",
      });
    }

    findUser.totalUnreadMessages -= 1;

    messageExists.isRead = true;

    await messageExists.save();
    await findUser.save();

    res.status(200).json({
      status: "success",
      msg: `Message fetched successfully`,
      messageExists,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      msg: "Server error, please try again",
    });
  }
};
