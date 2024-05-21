import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  totalMessages: number;
  totalReadMessages: number;
  totalUnreadMessages: number;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    totalMessages: {
      type: Number,
      default: 0,
    },
    totalReadMessages: {
      type: Number,
      default: 0,
    },
    totalUnreadMessages: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
