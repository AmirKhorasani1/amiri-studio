const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

let ioInstance;

function initSocket(server, allowedOrigins) {
  ioInstance = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
    },
  });

  ioInstance.on("connection", (socket) => {
    console.log("🔌 Client connected:", socket.id);

    socket.on("join-conversation", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("leave-conversation", (conversationId) => {
      socket.leave(conversationId);
    });

    socket.on("join-admin-room", (token) => {
      try {
        jwt.verify(token, process.env.JWT_SECRET);
        socket.join("admin-room");
      } catch (error) {
        socket.emit("auth-error", "Unauthorized");
      }
    });

    // --- Typing indicator ---
    // socket.to(room) broadcasts to everyone in the room EXCEPT the sender,
    // so the person typing never sees their own indicator echoed back.
    socket.on("typing", (conversationId) => {
      if (!conversationId) return;
      socket.to(conversationId).emit("typing", conversationId);
    });

    socket.on("stop-typing", (conversationId) => {
      if (!conversationId) return;
      socket.to(conversationId).emit("stop-typing", conversationId);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  return ioInstance;
}

function getIO() {
  if (!ioInstance) {
    throw new Error("Socket.io has not been initialized");
  }
  return ioInstance;
}

module.exports = { initSocket, getIO };