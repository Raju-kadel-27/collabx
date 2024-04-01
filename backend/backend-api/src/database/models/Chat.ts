import mongoose, { Model, Document } from "mongoose";

export interface IChat extends Document {
  chatName: string;
  isGroupChat: string;
  chatRoom: string;
  users: string[];
  latestMessage: string;
  groupAdmin: string;
};

const ChatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },

    isGroupChat: {
      type: Boolean,
      default: false,
    },

    chatRoom: { type: String },

    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },

    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);

const ChatModel = mongoose.model<IChat>("Chat", ChatSchema);

export default ChatModel;
