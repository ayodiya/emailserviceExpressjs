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
      msg: " message sent successfully",
      newMessage,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      msg: "Server error, please try again",
    });
  }
};
