const path = require("path");
const fs = require("fs");
const Article = require("../models/Article");
const slugify = require("../utils/slugify");

const estimateReadingTime = (content) => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 150));
};

const generateUniqueSlug = async (title, excludeId = null) => {
  let baseSlug = slugify(title) || "article";
  let slug = baseSlug;
  let counter = 1;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const filter = { slug };
    if (excludeId) filter._id = { $ne: excludeId };
    const exists = await Article.findOne(filter);
    if (!exists) break;
    counter += 1;
    slug = `${baseSlug}-${counter}`;
  }

  return slug;
};

const parseTags = (tags) =>
  typeof tags === "string" ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

const deleteCoverFile = (coverPath) => {
  if (!coverPath) return;
  const absolutePath = path.join(__dirname, "..", coverPath.replace(/^\/+/, ""));
  fs.unlink(absolutePath, () => {}); // اگه فایل نبود یا خطا داد، مهم نیست
};

// POST /api/articles  (ادمین)
const createArticle = async (req, res) => {
  try {
    const { title, excerpt, content, tags, category, status } = req.body;

    if (!title || !excerpt || !content || !req.file) {
      return res
        .status(400)
        .json({ success: false, error: "عنوان، توضیح کوتاه، محتوا و تصویر کاور الزامی هستند" });
    }

    const slug = await generateUniqueSlug(title);
    const readingTime = estimateReadingTime(content);
    const finalStatus = status === "published" ? "published" : "draft";
    const cover = `/uploads/covers/${req.file.filename}`;

    const article = await Article.create({
      title: title.trim(),
      slug,
      excerpt: excerpt.trim(),
      content,
      cover,
      tags: parseTags(tags),
      category: category?.trim() || "",
      readingTime,
      status: finalStatus,
      publishedAt: finalStatus === "published" ? new Date() : null,
    });

    res.status(201).json({ success: true, data: article });
  } catch (error) {
    if (req.file) deleteCoverFile(`/uploads/covers/${req.file.filename}`);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, error: messages.join(", ") });
    }
    res.status(500).json({ success: false, error: "خطا در ایجاد مقاله" });
  }
};

// PUT /api/articles/:id  (ادمین)
const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, error: "مقاله پیدا نشد" });
    }

    const { title, excerpt, content, tags, category, status } = req.body;

    if (title && title.trim() !== article.title) {
      article.title = title.trim();
      article.slug = await generateUniqueSlug(title, article._id);
    }

    if (excerpt) article.excerpt = excerpt.trim();
    if (content) {
      article.content = content;
      article.readingTime = estimateReadingTime(content);
    }
    if (tags !== undefined) article.tags = parseTags(tags);
    if (category !== undefined) article.category = category.trim();

    if (req.file) {
      deleteCoverFile(article.cover);
      article.cover = `/uploads/covers/${req.file.filename}`;
    }

    if (status && status !== article.status) {
      article.status = status;
      if (status === "published" && !article.publishedAt) {
        article.publishedAt = new Date();
      }
    }

    await article.save();
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    if (req.file) deleteCoverFile(`/uploads/covers/${req.file.filename}`);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, error: messages.join(", ") });
    }
    res.status(500).json({ success: false, error: "خطا در ویرایش مقاله" });
  }
};

// DELETE /api/articles/:id  (ادمین)
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, error: "مقاله پیدا نشد" });
    }
    deleteCoverFile(article.cover);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: "خطا در حذف مقاله" });
  }
};

// GET /api/articles  (عمومی)
const getPublishedArticles = async (req, res) => {
  try {
    const { category, tag, page = 1, limit = 9 } = req.query;
    const filter = { status: "published" };
    if (category) filter.category = category;
    if (tag) filter.tags = tag;

    const skip = (Number(page) - 1) * Number(limit);

    const [articles, total] = await Promise.all([
      Article.find(filter)
        .select("-content")
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Article.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: articles,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)) || 1,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "خطا در دریافت مقالات" });
  }
};

// GET /api/articles/:slug  (عمومی)
const getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug, status: "published" });
    if (!article) {
      return res.status(404).json({ success: false, error: "مقاله پیدا نشد" });
    }
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, error: "خطا در دریافت مقاله" });
  }
};

// GET /api/articles/admin/all  (ادمین)
const getAllArticlesAdmin = async (req, res) => {
  try {
    const articles = await Article.find().select("-content").sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: articles.length, data: articles });
  } catch (error) {
    res.status(500).json({ success: false, error: "خطا در دریافت لیست مقالات" });
  }
};

// GET /api/articles/admin/:id  (ادمین)
const getArticleByIdAdmin = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, error: "مقاله پیدا نشد" });
    }
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, error: "خطا در دریافت مقاله" });
  }
};

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
  getPublishedArticles,
  getArticleBySlug,
  getAllArticlesAdmin,
  getArticleByIdAdmin,
};