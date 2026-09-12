const express = require("express");
const router = express.Router();
const {
  createArticle,
  updateArticle,
  deleteArticle,
  getPublishedArticles,
  getArticleBySlug,
  getAllArticlesAdmin,
  getArticleByIdAdmin,
} = require("../controllers/article.controller");
const { protect } = require("../middleware/auth.middleware");
const uploadCover = require("../middleware/upload.middleware");

router.get("/", getPublishedArticles);

router.get("/admin/all", protect, getAllArticlesAdmin);
router.get("/admin/:id", protect, getArticleByIdAdmin);
router.post("/", protect, uploadCover.single("cover"), createArticle);
router.put("/:id", protect, uploadCover.single("cover"), updateArticle);
router.delete("/:id", protect, deleteArticle);

router.get("/:slug", getArticleBySlug);

module.exports = router;