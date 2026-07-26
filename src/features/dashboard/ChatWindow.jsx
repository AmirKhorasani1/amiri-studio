import React, { useEffect, useRef } from "react";
import {
  HiMagnifyingGlass,
  HiPhone,
  HiEllipsisVertical,
  HiArrowLeft,
} from "react-icons/hi2";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { sendMessage } from "../../api/conversationApi";
import { getInitial, getColor, formatTime } from "./utils/formatConversation";

const ChatWindow = ({ conversation, onBack }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);

  const handleSend = async (text) => {
    if (!conversation?._id) return;
    try {
      await sendMessage(conversation._id, text, "admin");
      // آپدیت از طریق event "conversation-updated" به ChatDashboardPage میرسه
      // و چون این کامپوننت prop رو از همون‌جا می‌گیره، خودش دوباره رندر میشه — نیازی به state جدا نیست
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  if (!conversation) {
    return (
      <div className="hidden flex-1 items-center justify-center bg-neutral-950 lg:flex">
        <p className="text-sm text-neutral-500">Select a conversation to start</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-1 flex-col bg-neutral-950">
      <div className="flex items-center gap-3 border-b border-neutral-800 px-4 py-3">
        <button
          onClick={onBack}
          aria-label="Back"
          className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 hover:bg-neutral-900 lg:hidden"
        >
          <HiArrowLeft size={18} />
        </button>

        <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white ${getColor(conversation._id)}`}>
          {getInitial(conversation.fullName)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{conversation.fullName}</p>
          <p className="truncate text-xs text-neutral-500">
            {conversation.phone} · {conversation.status}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 hover:bg-neutral-900">
            <HiMagnifyingGlass size={18} />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 hover:bg-neutral-900">
            <HiPhone size={18} />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 hover:bg-neutral-900">
            <HiEllipsisVertical size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {conversation.messages.length === 0 ? (
          <p className="mt-10 text-center text-sm text-neutral-500">No messages yet</p>
        ) : (
          conversation.messages.map((m) => (
            <MessageBubble
              key={m._id}
              message={{
                id: m._id,
                sender: m.sender === "admin" ? "me" : "them",
                type: "text",
                content: m.text,
                time: formatTime(m.createdAt),
              }}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;