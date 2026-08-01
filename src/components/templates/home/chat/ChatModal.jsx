import React from "react";

const ChatModal = ({ isOpen, onClose, children }) => {
  return (
    <>
      <div
        onClick={onClose}
        aria-hidden={!isOpen}
        className={`
          fixed inset-0 z-[9998]
          transition-opacity duration-400
          ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}
        `}
      />
      <aside
        aria-hidden={!isOpen}
        className={`
          no-scrollbar
          fixed z-[9999] flex flex-col
          md:border border-neutral-700/70
          bg-black md:bg-[#0a0a0a] text-white
          transition-transform duration-400
          ease-[cubic-bezier(0.16,1,0.3,1)]
          overflow-hidden
          inset-0 w-full rounded-none
          md:inset-auto md:top-3 md:bottom-3 md:right-2
          md:w-[430px] md:max-w-[92vw] md:rounded-2xl p-4
          ${isOpen ? "translate-x-0" : "translate-x-[calc(100%+2rem)]"}
        `}
      >
        {children}
      </aside>
    </>
  );
};

export default ChatModal;