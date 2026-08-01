// ChatWindow.jsx
import { useRef, useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { sendMessage } from "@api/conversationApi";
import { socket } from "@lib/socket";

const ChatWindow = ({ conversation, setConversation }) => {
  const [sending, setSending] = useState(false);
  const [isAdminTyping, setIsAdminTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages, isAdminTyping]);

  useEffect(() => {
    if (!conversation?._id) return;

    socket.emit("join-conversation", conversation._id);

    const handleNewMessage = (updatedConversation) => {
      if (updatedConversation._id === conversation._id) {
        setConversation(updatedConversation);
        setIsAdminTyping(false); // a real message arrived, indicator is stale
      }
    };

    const handleTyping = (conversationId) => {
      if (conversationId === conversation._id) setIsAdminTyping(true);
    };

    const handleStopTyping = (conversationId) => {
      if (conversationId === conversation._id) setIsAdminTyping(false);
    };

    socket.on("new-message", handleNewMessage);
    socket.on("typing", handleTyping);
    socket.on("stop-typing", handleStopTyping);

    return () => {
      socket.emit("leave-conversation", conversation._id);
      socket.off("new-message", handleNewMessage);
      socket.off("typing", handleTyping);
      socket.off("stop-typing", handleStopTyping);
    };
  }, [conversation?._id, setConversation]);

  const handleSend = async (text) => {
    setSending(true);
    try {
      await sendMessage(conversation._id, text, "visitor");
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <div className="no-scrollbar flex-1 overflow-y-auto">
        {conversation.messages.length === 0 && (
          <p className="pt-90 text-center text-sm text-neutral-500">
            No messages yet. Send the first one 👋
          </p>
        )}

        <div className="flex flex-col gap-2 py-18">
          {conversation.messages.map((msg) => (
            <MessageBubble key={msg._id} {...msg} />
          ))}
          {isAdminTyping && <TypingIndicator />}
        </div>

        <div ref={messagesEndRef} />
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <ChatInput
          onSend={handleSend}
          sending={sending}
          conversationId={conversation._id}
        />
      </div>
    </div>
  );
};

export default ChatWindow;