import React, { useEffect, useState } from "react";
import ChatSidebar from "../features/dashboard/ChatSidebar";
import ChatWindow from "../features/dashboard/ChatWindow";
import { getAllConversations } from "../api/conversationApi";
import { getToken } from "../api/authApi";
import { socket } from "../lib/socket";

const ChatDashboardPage = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);

  // بار اول: کل لیست مکالمات رو از API بگیر
  useEffect(() => {
    getAllConversations()
      .then((res) => setConversations(res.data.data))
      .catch((err) => console.error("Failed to load conversations:", err))
      .finally(() => setLoading(false));
  }, []);

  // وارد شدن به admin-room برای گرفتن آپدیت‌های زنده لیست
  useEffect(() => {
    const token = getToken();
    socket.emit("join-admin-room", token);

    const handleNewConversation = (conv) => {
      setConversations((prev) => [conv, ...prev]);
    };

    const handleConversationUpdated = (updated) => {
      setConversations((prev) => {
        const exists = prev.some((c) => c._id === updated._id);
        const next = exists
          ? prev.map((c) => (c._id === updated._id ? updated : c))
          : [updated, ...prev];
        return [...next].sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt));
      });
    };

    socket.on("new-conversation", handleNewConversation);
    socket.on("conversation-updated", handleConversationUpdated);

    return () => {
      socket.off("new-conversation", handleNewConversation);
      socket.off("conversation-updated", handleConversationUpdated);
    };
  }, []);

  const activeConversation = conversations.find((c) => c._id === activeId) ?? null;

  return (
    <div className="relative flex h-[calc(100vh-64px)] w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
      <ChatSidebar
        conversations={conversations}
        loading={loading}
        activeId={activeId}
        onSelectChat={setActiveId}
        className={activeConversation ? "hidden lg:flex" : "flex"}
      />

      <div className={`flex-1 ${activeConversation ? "flex" : "hidden lg:flex"}`}>
        <ChatWindow conversation={activeConversation} onBack={() => setActiveId(null)} />
      </div>
    </div>
  );
};

export default ChatDashboardPage;