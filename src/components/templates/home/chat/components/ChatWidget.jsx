import { useState, useEffect } from "react";
import { useLanguage } from "@context/LanguageContext";
import ChatButton from "@common/ChatButton/ChatButton";
import ContactForm from "./ContactForm";
import ChatWindow from "./ChatWindow";
import {
  startConversation,
  getConversation,
} from "@api/conversationApi";
import avatarImg from "@assets/images/5992397663862721915.jpg";

const STORAGE_KEY = "portfolio_conversation_id";

const translations = {
  en: {
    loading: "Loading...",
    subtitle: "Available for freelance",
    bio: "Frontend developer specializing in React and modern web experiences. Feel free to reach out about your project.",
  },
  fa: {
    loading: "در حال بارگذاری...",
    subtitle: "آماده همکاری فریلنسری",
    bio: "توسعه‌دهنده فرانت‌اند، متخصص React و تجربه‌های وب مدرن. برای صحبت درباره پروژه‌تان خوشحال می‌شوم در ارتباط باشیم.",
  },
};

const ChatWidget = () => {
  const { language } = useLanguage();
  const t = translations[language] ?? translations.en;

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
      localStorage.setItem(
        STORAGE_KEY,
        res.data.data._id
      );
    } catch (err) {
      console.error("خطا در شروع مکالمه:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatButton
      title="Amir Khorasani"
      subtitle={t.subtitle}
      avatarUrl={avatarImg}
      bio={t.bio}
      email="amirkhorasani2007@gmail.com"
      phone="09139634709"
    >
      {initializing ? (
        <p className="text-center text-neutral-400 dark:text-neutral-500">
          {t.loading}
        </p>
      ) : conversation ? (
        <ChatWindow
          conversation={conversation}
          setConversation={setConversation}
        />
      ) : (
        <ContactForm
          onSubmit={handleStartConversation}
          loading={loading}
        />
      )}
    </ChatButton>
  );
};

export default ChatWidget;