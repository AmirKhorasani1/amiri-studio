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
  const [localConversation, setLocalConversation] = useState(conversation);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setLocalConversation(conversation);
  }, [conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localConversation?.messages, isVisitorTyping]);

  useEffect(() => {
    if (!conversation?._id) return;

    const conversationId = conversation._id;

    const joinConversation = () => {
      console.log("📥 Joining conversation:", conversationId);
      socket.emit("join-conversation", conversationId);
    };

    if (socket.connected) {
      joinConversation();
    } else {
      socket.once("connect", joinConversation);
      socket.connect();
    }

    setIsVisitorTyping(false);

    const handleNewMessage = (updatedConversation) => {
      if (updatedConversation?._id !== conversationId) return;

      setLocalConversation(updatedConversation);
      setIsVisitorTyping(false);
    };

    const handleTyping = (id) => {
      if (id === conversationId) {
        setIsVisitorTyping(true);
      }
    };

    const handleStopTyping = (id) => {
      if (id === conversationId) {
        setIsVisitorTyping(false);
      }
    };

    socket.on("new-message", handleNewMessage);
    socket.on("typing", handleTyping);
    socket.on("stop-typing", handleStopTyping);

    return () => {
      socket.off("connect", joinConversation);
      socket.emit("leave-conversation", conversationId);
      socket.off("new-message", handleNewMessage);
      socket.off("typing", handleTyping);
      socket.off("stop-typing", handleStopTyping);
    };
  }, [conversation?._id]);

  const handleSend = async (text) => {
    if (!localConversation?._id || !text.trim()) return;

    try {
      await sendMessage(
        localConversation._id,
        text,
        "admin"
      );
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  if (!localConversation) {
    return (
      <div className="hidden flex-1 items-center justify-center bg-neutral-950 lg:flex">
        <p className="text-sm text-neutral-500">
          Select a conversation to start
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-1 flex-col bg-neutral-950">
      {/* Header */}
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
            localConversation._id
          )}`}
        >
          {getInitial(localConversation.fullName)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">
            {localConversation.fullName}
          </p>

          <p className="truncate text-xs text-neutral-500">
            {isVisitorTyping
              ? "typing…"
              : localConversation.phone}
          </p>
        </div>

        <StatusDropdown
          conversationId={localConversation._id}
          status={localConversation.status}
        />

        <div className="flex items-center gap-1">
          <button
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 hover:bg-neutral-900"
          >
            <HiMagnifyingGlass size={18} />
          </button>

          <button
            aria-label="Call"
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 hover:bg-neutral-900"
          >
            <HiPhone size={18} />
          </button>

          <button
            aria-label="More"
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 hover:bg-neutral-900"
          >
            <HiEllipsisVertical size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-2 overflow-y-auto px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {localConversation.messages.length === 0 ? (
          <p className="mt-10 text-center text-sm text-neutral-500">
            No messages yet
          </p>
        ) : (
          localConversation.messages.map((message) => (
            <MessageBubble
              key={message._id}
              message={{
                id: message._id,
                sender:
                  message.sender === "admin"
                    ? "me"
                    : "them",
                type: "text",
                content: message.text,
                time: formatTime(message.createdAt),
              }}
            />
          ))
        )}

        {isVisitorTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <MessageInput
        onSend={handleSend}
        conversationId={localConversation._id}
      />
    </div>
  );
};

export default ChatWindow;