// ChatButton.jsx
import React, { useState, useEffect, useCallback } from "react";
import { HiMiniChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import ChatModal from "@home/chat/ChatModal";
import ChatHeader from "@home/chat/components/ChatHeader";
import ChatProfile from "@home/chat/components/ChatProfile";
import { HiChatBubbleOvalLeft } from "react-icons/hi2";

const ChatButton = ({
  title = "Talk to me",
  subtitle = "Usually replies within a day",
  avatarUrl,
  bio,
  email,
  phone,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("chat");

  const openModal = () => setIsOpen(true);

  const closeModal = useCallback(() => {
    if (window.history.state?.chatModal) {
      window.history.back();
    } else {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    window.history.pushState({ chatModal: true }, "");

    const handlePopState = () => setIsOpen(false);
    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => setView("chat"), 450);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <>
      {!isOpen && (
        <button
          onClick={openModal}
          aria-label="Start chat"
          className="
            fixed bottom-2 right-5 z-[10000]
            flex w-12.5 h-12.5 md:h-16 md:w-16 items-center justify-center
            rounded-full border-0
            cursor-pointer
            bg-white text-black
            shadow-[0_6px_20px_rgba(0,0,0,0.25)]
            transition-all duration-300
            hover:-translate-y-0.5
            hover:scale-110
            hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)]
            active:scale-95
          "
        >
          <span className="flex transition-transform duration-300 hover:-rotate-[8deg] hover:scale-105">
            <HiMiniChatBubbleOvalLeftEllipsis size={33} />
          </span>
        </button>
      )}

      <ChatModal isOpen={isOpen} onClose={closeModal}>
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          <ChatHeader
            title={title}
            subtitle={subtitle}
            avatarUrl={avatarUrl}
            onClose={closeModal}
            onProfileClick={() => setView("profile")}
          />

          <div className="relative min-h-0 flex-1">
            {/* لایه چت */}
            <div
              className={`absolute inset-0 flex min-h-0 flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                view === "chat"
                  ? "translate-x-0 opacity-100"
                  : "pointer-events-none -translate-x-3 opacity-0"
              }`}
            >
              {children}
            </div>

            {/* لایه پروفایل */}
            <div
              className={`absolute inset-0 flex min-h-0 flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                view === "profile"
                  ? "translate-x-0 opacity-100"
                  : "pointer-events-none translate-x-3 opacity-0"
              }`}
            >
              <ChatProfile
                avatarUrl={avatarUrl}
                name={title}
                subtitle={subtitle}
                bio={bio}
                email={email}
                phone={phone}
                onBack={() => setView("chat")}
              />
            </div>
          </div>
        </div>
      </ChatModal>
    </>
  );
};

export default ChatButton;