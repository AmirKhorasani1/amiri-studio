import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

// یک اتصال واحد که در کل اپ به اشتراک گذاشته میشه (Singleton)
export const socket = io(SOCKET_URL, {
  autoConnect: true,
});