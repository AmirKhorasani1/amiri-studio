const Conversation = require("../models/Conversation");
const { getIO } = require("../socket/socket");

const createConversation = async (req, res) => {
  try {
    const { fullName, phone, email, company } = req.body;

    if (!phone || !phone.trim()) {
      return res.status(400).json({ success: false, error: "شماره موبایل الزامی است" });
    }

    const normalizedPhone = phone.trim();

    let conversation = await Conversation.findOne({ phone: normalizedPhone });

    if (conversation) {
      let hasChanges = false;

      if (fullName && fullName.trim() && fullName.trim() !== conversation.fullName) {
        conversation.fullName = fullName.trim();
        hasChanges = true;
      }
      if (email && email.trim() && email.trim() !== conversation.email) {
        conversation.email = email.trim();
        hasChanges = true;
      }
      if (company && company.trim() && company.trim() !== conversation.company) {
        conversation.company = company.trim();
        hasChanges = true;
      }

      if (hasChanges) {
        await conversation.save();
      }

      return res.status(200).json({ success: true, data: conversation, reused: true });
    }

    conversation = await Conversation.create({
      fullName,
      phone: normalizedPhone,
      email,
      company,
    });

    getIO().to("admin-room").emit("new-conversation", conversation);

    res.status(201).json({ success: true, data: conversation, reused: false });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, error: messages.join(", ") });
    }
    res.status(500).json({ success: false, error: "خطا در ایجاد مکالمه" });
  }
};

// GET /api/conversations/:id
const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return res.status(404).json({ success: false, error: "مکالمه پیدا نشد" });
    }

    res.status(200).json({ success: true, data: conversation });
  } catch (error) {
    res.status(500).json({ success: false, error: "خطا در دریافت مکالمه" });
  }
};

// GET /api/conversations
const getAllConversations = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const conversations = await Conversation.find(filter).sort({ lastMessageAt: -1 });

    res.status(200).json({ success: true, count: conversations.length, data: conversations });
  } catch (error) {
    res.status(500).json({ success: false, error: "خطا در دریافت لیست مکالمات" });
  }
};

// POST /api/conversations/:id/messages
const addMessage = async (req, res) => {
  try {
    const { text, sender } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, error: "متن پیام نمی‌تواند خالی باشد" });
    }

    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return res.status(404).json({ success: false, error: "مکالمه پیدا نشد" });
    }

    conversation.messages.push({ text, sender });
    conversation.lastMessageAt = new Date();

    if (sender === "admin" && conversation.status === "new") {
      conversation.status = "opened";
    }

    await conversation.save();

    const io = getIO();

    // به هر کسی که تو room همین مکالمه‌ست (بازدیدکننده یا ادمین) پیام جدید رو بفرست
    io.to(conversation._id.toString()).emit("new-message", conversation);

    // به لیست داشبورد هم بگو که این مکالمه آپدیت شد (برای مرتب‌سازی مجدد بر اساس lastMessageAt)
    io.to("admin-room").emit("conversation-updated", conversation);

    res.status(200).json({ success: true, data: conversation });
  } catch (error) {
    res.status(500).json({ success: false, error: "خطا در ارسال پیام" });
  }
};

// PATCH /api/conversations/:id/status
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["new", "opened", "closed"].includes(status)) {
      return res.status(400).json({ success: false, error: "وضعیت نامعتبر است" });
    }

    const conversation = await Conversation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!conversation) {
      return res.status(404).json({ success: false, error: "مکالمه پیدا نشد" });
    }

    getIO().to("admin-room").emit("conversation-updated", conversation);

    res.status(200).json({ success: true, data: conversation });
  } catch (error) {
    res.status(500).json({ success: false, error: "خطا در تغییر وضعیت" });
  }
};

module.exports = {
  createConversation,
  getConversation,
  getAllConversations,
  addMessage,
  updateStatus,
};