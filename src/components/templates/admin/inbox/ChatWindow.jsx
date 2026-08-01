// ChatWindow.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  HiMagnifyingGlass,
  HiPhone,
  HiEllipsisVertical,
  HiArrowLeft,
} from "react-icons/hi2";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import StatusDropdown from "./StatusDropdown";
import TypingIndicator from "./TypingIndicator";
import { sendMessage } from "@api/conversationApi";
import { socket } from "@lib/socket";
import { getInitial, getColor, formatTime } from "./utils/formatConversation";

const ChatWindow = ({ conversation, onBack }) => {
  const [isVisitorTyping, setIsVisitorTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages, isVisitorTyping]);

  // Join the conversation room so real-time events (messages, typing)
  // for the currently open chat reach this admin session.
  useEffect(() => {
    if (!conversation?._id) return;

    socket.emit("join-conversation", conversation._id);
    setIsVisitorTyping(false); // reset when switching conversations

    const handleTyping = (conversationId) => {
      if (conversationId === conversation._id) setIsVisitorTyping(true);
    };

    const handleStopTyping = (conversationId) => {
      if (conversationId === conversation._id) setIsVisitorTyping(false);
    };

    socket.on("typing", handleTyping);
    socket.on("stop-typing", handleStopTyping);

    return () => {
      socket.emit("leave-conversation", conversation._id);
      socket.off("typing", handleTyping);
      socket.off("stop-typing", handleStopTyping);
    };
  }, [conversation?._id]);

  const handleSend = async (text) => {
    if (!conversation?._id) return;
    try {
      await sendMessage(conversation._id, text, "admin");
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

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white ${getColor(
            conversation._id
          )}`}
        >
          {getInitial(conversation.fullName)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">
            {conversation.fullName}
          </p>
          <p className="truncate text-xs text-neutral-500">
            {isVisitorTyping ? "typing…" : conversation.phone}
          </p>
        </div>

        <StatusDropdown conversationId={conversation._id} status={conversation.status} />

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
        {isVisitorTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSend={handleSend} conversationId={conversation._id} />
    </div>
  );
};

export default ChatWindow;