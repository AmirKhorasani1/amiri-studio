const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

let ioInstance;

function initSocket(server, corsOrigin) {
  ioInstance = new Server(server, {
    cors: {
      origin: corsOrigin,
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
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
      } catch {
        socket.emit("auth-error", "Unauthorized");
      }
    });

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
