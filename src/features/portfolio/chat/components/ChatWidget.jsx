import { useState, useEffect } from "react";
import ChatButton from "../../../../components/common/ChatButton/ChatButton";
import ContactForm from "./ContactForm";
import ChatWindow from "./ChatWindow";
import { startConversation, getConversation } from "../../../../api/conversationApi";
import avatarImg from "../../../../assets/images/5992397663862721915.jpg";

const STORAGE_KEY = "portfolio_conversation_id";

const ChatWidget = () => {
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const savedId = localStorage.getItem(STORAGE_KEY);
    if (!savedId) {
      setInitializing(false);
      return;
    }

    getConversation(savedId)
      .then((res) => setConversation(res.data.data))
      .catch(() => localStorage.removeItem(STORAGE_KEY))
      .finally(() => setInitializing(false));
  }, []);

  const handleStartConversation = async (formData) => {
    setLoading(true);
    try {
      const res = await startConversation(formData);
      setConversation(res.data.data);
      localStorage.setItem(STORAGE_KEY, res.data.data._id);
    } catch (err) {
      console.error("خطا در شروع مکالمه:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatButton   
      title="Amir Khorasani"
      subtitle="Available for freelance"
      avatarUrl={avatarImg}
  >
      {initializing ? (
        <p className="text-center text-neutral-400">در حال بارگذاری...</p>
      ) : conversation ? (
        <ChatWindow conversation={conversation} setConversation={setConversation} />
      ) : (
        <ContactForm onSubmit={handleStartConversation} loading={loading} />
      )}
    </ChatButton>
  );
};

export default ChatWidget;