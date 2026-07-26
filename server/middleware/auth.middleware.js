const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
};

// برای مسیر پیام‌ها: فقط وقتی sender === "admin" باشه توکن لازمه
// (چون همین route رو بازدیدکننده هم بدون لاگین استفاده می‌کنه)
const protectIfAdminSender = (req, res, next) => {
  if (req.body.sender === "admin") {
    return protect(req, res, next);
  }
  next();
};

module.exports = { protect, protectIfAdminSender };