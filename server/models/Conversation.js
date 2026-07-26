const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      enum: ["visitor", "admin"],
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const conversationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "نام و نام خانوادگی الزامی است"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "شماره موبایل الزامی است"],
      trim: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    company: {
      type: String,
      required: false,
      trim: true,
    },

    messages: {
      type: [messageSchema],
      default: [],
    },

    status: {
      type: String,
      enum: ["new", "opened", "closed"],
      default: "new",
    },

    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

conversationSchema.index({ lastMessageAt: -1 });

conversationSchema.index({ status: 1 });

module.exports = mongoose.model("Conversation", conversationSchema);