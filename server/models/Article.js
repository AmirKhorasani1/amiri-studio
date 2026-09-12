const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "عنوان مقاله الزامی است"], trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    excerpt: { type: String, required: [true, "توضیح کوتاه الزامی است"], trim: true, maxlength: 300 },
    content: { type: String, required: [true, "محتوای مقاله الزامی است"] },
    cover: { type: String, required: [true, "تصویر کاور الزامی است"] },
    tags: { type: [String], default: [] },
    category: { type: String, trim: true, default: "" },
    readingTime: { type: Number, default: 1 },
    publishedAt: { type: Date, default: null },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", ArticleSchema);