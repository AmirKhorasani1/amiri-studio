import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@context/LanguageContext";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { sendMessage } from "@api/conversationApi";
import { socket } from "@lib/socket";

const translations = {
  en: {
    empty: "No messages yet. Send the first one 👋",
  },
  fa: {
    empty: "هنوز پیامی وجود ندارد. اولین پیام را ارسال کنید 👋",
  },
};

const ChatWindow = ({ conversation, setConversation }) => {
  const { language } = useLanguage();
  const t = translations[language] ?? translations.en;
  const isRTL = language === "fa";

  const [sending, setSending] = useState(false);
  const [isAdminTyping, setIsAdminTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages, isAdminTyping]);

  useEffect(() => {
    if (!conversation?._id) return;

    const conversationId = conversation._id;

    const joinConversation = () => {
      socket.emit("join-conversation", conversationId);
    };

    if (socket.connected) {
      joinConversation();
    } else {
      socket.once("connect", joinConversation);
      socket.connect();
    }

    const handleNewMessage = (updatedConversation) => {
      if (updatedConversation?._id !== conversationId) return;

      setConversation(updatedConversation);
      setIsAdminTyping(false);
    };

    const handleTyping = (id) => {
      if (id === conversationId) setIsAdminTyping(true);
    };

    const handleStopTyping = (id) => {
      if (id === conversationId) setIsAdminTyping(false);
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
  }, [conversation?._id, setConversation]);

  const handleSend = async (text) => {
    if (!conversation?._id || sending) return;

    setSending(true);

    try {
      const res = await sendMessage(
        conversation._id,
        text,
        "visitor"
      );

      if (res?.data?.data) {
        setConversation(res.data.data);
      }
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
          <p
            dir={isRTL ? "rtl" : "ltr"}
            className="pt-90 text-center text-sm text-neutral-500 dark:text-neutral-500"
          >
            {t.empty}
          </p>
        )}

        <div className="flex flex-col gap-2 py-18">
          {conversation.messages.map((msg) => (
            <MessageBubble
              key={msg._id}
              {...msg}
            />
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