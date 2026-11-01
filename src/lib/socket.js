import { io } from "socket.io-client";

// Use the current frontend origin so Socket.IO follows the active network.
// Vite proxies /socket.io to the Express server during development.
const SOCKET_URL = window.location.origin;

const isLighthouse = navigator.userAgent.includes("Lighthouse");

export const socket = io(SOCKET_URL, {
  path: "/socket.io",
  autoConnect: false,
  transports: ["websocket", "polling"],
  withCredentials: true,
});

export const connectSocket = () => {
  if (isLighthouse) return;

  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
