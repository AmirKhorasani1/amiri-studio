require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const conversationRoutes = require("./routes/conversation.routes");
const authRoutes = require("./routes/auth.routes");
const articleRoutes = require("./routes/article.routes");
const aiChatRoutes = require("./routes/ai-chat.routes");
const { initSocket } = require("./socket/socket");

connectDB();

const app = express();
const server = http.createServer(app);

const allowedOrigins = (process.env.CLIENT_URLS || "")
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

const isLocalNetworkOrigin = (origin) => {
  try {
    const { hostname, protocol } = new URL(origin);
    if (protocol !== "http:" && protocol !== "https:") return false;

    return (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "::1" ||
      hostname.endsWith(".local") ||
      /^10(?:\.\d{1,3}){3}$/.test(hostname) ||
      /^192\.168(?:\.\d{1,3}){2}$/.test(hostname) ||
      /^172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2}$/.test(hostname)
    );
  } catch {
    return false;
  }
};

const isAllowedOrigin = (origin) =>
  !origin ||
  allowedOrigins.includes(origin) ||
  (process.env.NODE_ENV !== "production" && isLocalNetworkOrigin(origin));

const corsOrigin = (origin, callback) => {
  if (isAllowedOrigin(origin)) {
    return callback(null, true);
  }

  return callback(new Error("Not allowed by CORS"));
};

initSocket(server, corsOrigin);

app.use(cors({ origin: corsOrigin }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running ✅" });
});

app.use("/api/auth", authRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/ai-chat", aiChatRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Server available on 0.0.0.0:${PORT}`);
  console.log(`✅ Allowed origins: ${allowedOrigins.join(", ")}`);
});
