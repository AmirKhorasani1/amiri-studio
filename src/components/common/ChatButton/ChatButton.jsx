// ChatButton.jsx
import React, { useState, useEffect, useCallback } from "react";
import { HiMiniChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import ChatModal from "../../../features/portfolio/chat/ChatModal";
import ChatHeader from "../../../features/portfolio/chat/components/ChatHeader";

const ChatButton = ({
  title = "Talk to me",
  subtitle = "Usually replies within a day",
  avatarUrl,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  // Single source of truth for closing — used by the X button, the
  // overlay click, AND the mobile back button (popstate below).
  const closeModal = useCallback(() => {
    if (window.history.state?.chatModal) {
      window.history.back();
    } else {
      setIsOpen(false);
    }
  }, []);

  // Push a dummy history entry while the modal is open, so the
  // mobile back button closes it instead of leaving the site.
  useEffect(() => {
    if (!isOpen) return;

    window.history.pushState({ chatModal: true }, "");

    const handlePopState = () => setIsOpen(false);
    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [isOpen]);

  return (
    <>
      {!isOpen && (
        <button
          onClick={openModal}
          aria-label="Start chat"
          className="
            fixed bottom-6 right-6 z-[10000]
            flex h-16 w-16 items-center justify-center
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
            <HiMiniChatBubbleOvalLeftEllipsis size={35} />
          </span>
        </button>
      )}

      <ChatModal isOpen={isOpen} onClose={closeModal}>
        <div className="relative flex min-h-0 flex-1 flex-col">
          <ChatHeader
            title={title}
            subtitle={subtitle}
            avatarUrl={avatarUrl}
            onClose={closeModal}
          />

          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </div>
      </ChatModal>
    </>
  );
};

export default ChatButton;