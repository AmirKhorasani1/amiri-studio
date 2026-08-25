import React, { useEffect, useState } from "react";
import ChatSidebar from "@admin/inbox/ChatSidebar";
import ChatWindow from "@admin/inbox/ChatWindow";
import { getAllConversations } from "@api/conversationApi";
import { getToken } from "@api/authApi";
import { socket } from "@lib/socket";

const ChatDashboardPage = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    getAllConversations()
      .then((res) => setConversations(res.data.data))
      .catch((err) =>
        console.error("Failed to load conversations:", err)
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    const joinAdminRoom = () => {
      console.log("👑 Joining admin room...");
      socket.emit("join-admin-room", token);
    };

    const handleNewConversation = (conv) => {
      setConversations((prev) => {
        const exists = prev.some((c) => c._id === conv._id);
        if (exists) return prev;
        return [conv, ...prev];
      });
    };

    const handleConversationUpdated = (updated) => {
      setConversations((prev) => {
        const exists = prev.some((c) => c._id === updated._id);

        const next = exists
          ? prev.map((c) =>
              c._id === updated._id ? updated : c
            )
          : [updated, ...prev];

        return [...next].sort(
          (a, b) =>
            new Date(b.lastMessageAt) -
            new Date(a.lastMessageAt)
        );
      });
    };

    socket.on("new-conversation", handleNewConversation);
    socket.on(
      "conversation-updated",
      handleConversationUpdated
    );

    // Socket is configured with autoConnect:false
    if (socket.connected) {
      joinAdminRoom();
    } else {
      socket.once("connect", joinAdminRoom);
      socket.connect();
    }

    return () => {
      socket.off("connect", joinAdminRoom);
      socket.off("new-conversation", handleNewConversation);
      socket.off(
        "conversation-updated",
        handleConversationUpdated
      );
    };
  }, []);

  const activeConversation =
    conversations.find((c) => c._id === activeId) ?? null;

  return (
    <div className="relative flex h-[calc(100vh-64px)] w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
      <ChatSidebar
        conversations={conversations}
        loading={loading}
        activeId={activeId}
        onSelectChat={setActiveId}
        className={
          activeConversation ? "hidden lg:flex" : "flex"
        }
      />

      <div
        className={`flex-1 ${
          activeConversation ? "flex" : "hidden lg:flex"
        }`}
      >
        <ChatWindow
          conversation={activeConversation}
          onBack={() => setActiveId(null)}
        />
      </div>
    </div>
  );
};

export default ChatDashboardPage;