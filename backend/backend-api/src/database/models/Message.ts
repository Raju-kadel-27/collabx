import mongoose, { Document } from "mongoose";

export interface IMessage extends Document {
  client_generated_uuid: string;
  room: string;
  type: string;
  message: string;
  message_kind: string;
  user1_last_read_message: string;
  user2_last_read_message: string;
  publicKey: string;
  sender: string;
};

const MessageSchema = new mongoose.Schema(
  {
    client_generated_uuid: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum:['INDIVIDUAL','GROUP'],
      default:'INDIVIDUAL'
    },

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      // chatId
    },

    message: {
      type: String,
      trim: false
    },

    message_kind:{
      type: String,
      required: true
    },

    user1_last_read_message: {
      type: String
    },

    user2_last_read_message: {
      type: String
    },

    publicKey: {
      type: String
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

  },

  { timestamps: true }

);

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel;
