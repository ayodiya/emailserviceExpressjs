import { Request, Response } from "express";
import User, { IUser } from "../models/User";

export const addUser = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const nameExists = await User.findOne({ name });

    if (nameExists) {
      return res.status(400).json({
        status: "failed",
        msg: "User with the name exists",
      });
    }

    const newUser = await User.create({
      name,
    } as IUser);

    res.status(201).json({
      status: "success",
      msg: "User added successfully",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      msg: "Server error, please try again",
    });
  }
};
