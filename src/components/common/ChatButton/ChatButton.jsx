import React, { useState, useEffect, useCallback } from "react";
import ChatModal from "@home/chat/ChatModal";
import ChatHeader from "@home/chat/components/ChatHeader";
import ChatProfile from "@home/chat/components/ChatProfile";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { useLanguage } from "@context/LanguageContext";

const translations = {
  en: {
    title: "Amir Khorasani",
    subtitle: "Available for work",
    start: "Start chat",
    closeProfile: "Close profile",
  },
  fa: {
    title: "امیر خراسانی",
    subtitle: "آماده همکاری",
    start: "شروع گفتگو",
    closeProfile: "بستن پروفایل",
  },
};

const ChatButton = ({ avatarUrl, bio, email, phone, children }) => {
  const { language } = useLanguage();
  const t = translations[language] ?? translations.en;
  const isRTL = language === "fa";

  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const openProfile = () => {
    setShowProfile(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setProfileVisible(true);
      });
    });
  };

  const closeProfile = useCallback(() => {
    setProfileVisible(false);

    setTimeout(() => {
      setShowProfile(false);
    }, 350);
  }, []);

  const closeModal = useCallback(() => {
    setShowProfile(false);
    setProfileVisible(false);

    if (window.history.state?.chatModal) {
      window.history.back();
    } else {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    window.history.pushState({ chatModal: true }, "");

    const handlePopState = () => {
      setIsOpen(false);
      setShowProfile(false);
      setProfileVisible(false);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setShowProfile(false);
      setProfileVisible(false);
    }
  }, [isOpen]);

  return (
    <>
      {!isOpen && (
        <button
          onClick={openModal}
          aria-label={t.start}
          className="
            fixed bottom-2 z-[10000]
            flex h-12 w-fit items-center justify-center gap-2
            rounded-full border-0 px-4
            bg-neutral-950 text-white
            shadow-[0_6px_20px_rgba(0,0,0,0.25)]
            transition-all duration-300
            hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)]
            active:scale-95
            dark:bg-white dark:text-black
            md:bottom-4.5
            ltr:left-4.5 rtl:right-4.5
          "
        >
          <HiOutlineChatBubbleOvalLeft size={24} />
          <span className="text-[15px] font-medium">{t.start}</span>
        </button>
      )}

      <ChatModal
        isOpen={isOpen}
        onClose={closeModal}
        isRTL={isRTL}
      >
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          <ChatHeader
            title={t.title}
            subtitle={t.subtitle}
            avatarUrl={avatarUrl}
            onClose={closeModal}
            onProfileClick={openProfile}
          />

          <div className="relative min-h-0 flex-1">
            {/* Chat */}
            <div className="absolute inset-0 flex min-h-0 flex-col">
              {children}
            </div>

            {/* Profile */}
            {showProfile && (
              <div className="absolute inset-0 z-50">
                {/* Backdrop */}
                <button
                  type="button"
                  aria-label={t.closeProfile}
                  onClick={closeProfile}
                  className={`
                    absolute inset-0 duration-350
                    ${
                      profileVisible
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                    }
                  `}
                />

                {/* Profile */}
                <div
                  className={`
                    absolute inset-x-0 top-0 z-10
                    transition-all duration-350
                    ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${
                      profileVisible
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-6 opacity-0"
                    }
                  `}
                >
                  <ChatProfile
                    avatarUrl={avatarUrl}
                    name={t.title}
                    subtitle={t.subtitle}
                    bio={bio}
                    email={email}
                    phone={phone}
                    onBack={closeProfile}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </ChatModal>
    </>
  );
};

export default ChatButton;