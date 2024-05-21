import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage extends Document {
  subject: string;
  content: string;
  isRead: boolean;
  receiver: string;
  sender: string;
}

const messageSchema: Schema<IMessage> = new Schema<IMessage>(
  {
    receiver: {
      type: String,
      required: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      required: true,
      default: false,
    },
    sender: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

const Message: Model<IMessage> = mongoose.model<IMessage>(
  "Message",
  messageSchema,
);
export default Message;
