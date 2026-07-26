// ChatWindow.jsx
import { useRef, useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { sendMessage } from "../../../../api/conversationApi";
import { socket } from "../../../../lib/socket";

const ChatWindow = ({ conversation, setConversation }) => {
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);

  useEffect(() => {
    if (!conversation?._id) return;

    socket.emit("join-conversation", conversation._id);

    const handleNewMessage = (updatedConversation) => {
      if (updatedConversation._id === conversation._id) {
        setConversation(updatedConversation);
      }
    };

    socket.on("new-message", handleNewMessage);

    return () => {
      socket.emit("leave-conversation", conversation._id);
      socket.off("new-message", handleNewMessage);
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
      {/* no-scrollbar added here — this is the element that actually scrolls */}
      <div className="no-scrollbar flex-1 overflow-y-auto p-4 pb-20 pt-16">
        {conversation.messages.length === 0 && (
          <p className="text-center text-sm text-neutral-500">
            No messages yet. Send the first one 👋
          </p>
        )}

        <div className="flex flex-col gap-2">
          {conversation.messages.map((msg) => (
            <MessageBubble key={msg._id} {...msg} />
          ))}
        </div>

        <div ref={messagesEndRef} />
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <ChatInput onSend={handleSend} sending={sending} />
      </div>
    </div>
  );
};

export default ChatWindow;