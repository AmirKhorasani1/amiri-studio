const express = require("express");
const router = express.Router();
const {
  createConversation,
  getConversation,
  getAllConversations,
  addMessage,
  updateStatus,
} = require("../controllers/conversation.controller");
const { protect, protectIfAdminSender } = require("../middleware/auth.middleware");

router.post("/", createConversation);                       // عمومی — بازدیدکننده مکالمه می‌سازه
router.get("/", protect, getAllConversations);               // فقط ادمین — لیست داشبورد
router.get("/:id", getConversation);                         // عمومی — بازدیدکننده مکالمه خودش رو می‌گیره
router.post("/:id/messages", protectIfAdminSender, addMessage); // شرطی — فقط اگه sender=admin توکن لازمه
router.patch("/:id/status", protect, updateStatus);          // فقط ادمین

module.exports = router;