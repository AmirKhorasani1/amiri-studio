// ChatHeader.jsx
import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { PiDotsThreeVerticalBold } from "react-icons/pi";

const ChatHeader = ({
  title,
  subtitle,
  avatarUrl,
  onClose,
  onProfileClick,
}) => {
  return (
    <div
      className="
        absolute inset-x-0 top-0 z-20
        flex items-center justify-between gap-2
        bg-gradient-to-b
        from-white
        via-white/80
        to-transparent
        dark:from-[#0a0a0a]
        dark:via-[#0a0a0a]/80
        dark:to-transparent
      "
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close chat"
        className="
          flex h-12.5 w-12.5 shrink-0
          items-center justify-center
          rounded-full
          bg-neutral-100/90
          text-neutral-700
          backdrop-blur-xs
          transition-all duration-300
          hover:bg-neutral-200
          hover:text-neutral-950
          active:scale-95
          dark:bg-neutral-800/85
          dark:text-neutral-300
          dark:hover:bg-white/20
          dark:hover:text-white
          ltr:rotate-0
          rtl:rotate-180
        "
      >
        <IoIosArrowRoundBack size={32} />
      </button>

      {/* Profile */}
      <button
        onClick={onProfileClick}
        aria-label="View profile"
        className="
          flex items-center gap-2.5
          rounded-full
          bg-neutral-100/90
          p-1.5
          backdrop-blur-xs
          transition-colors
          hover:bg-neutral-200
          active:bg-neutral-200
          dark:bg-neutral-800/85
          dark:hover:bg-white/20
          dark:active:bg-white/20
          rtl:pl-5
          ltr:pr-5
        "
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={title}
            className="h-10.5 w-10.5 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div
            className="
              flex h-10.5 w-10.5 shrink-0
              items-center justify-center
              rounded-full
              bg-neutral-200
              text-sm font-semibold
              text-neutral-800
              dark:bg-white/10
              dark:text-white
            "
          >
            {title?.charAt(0)}
          </div>
        )}

        <div className="min-w-0 flex-1 rtl:text-right ltr:text-left">
          <p className="truncate text-[14.5px] font-semibold text-neutral-900 dark:text-white">
            {title}
          </p>

          {subtitle && (
            <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
              {subtitle}
            </p>
          )}
        </div>
      </button>

      {/* More */}
      <button
        aria-label="More options"
        className="
          flex h-12.5 w-12.5 shrink-0
          items-center justify-center
          rounded-full
          bg-neutral-100/90
          text-neutral-700
          backdrop-blur-xs
          transition-all duration-300
          hover:bg-neutral-200
          hover:text-neutral-950
          active:scale-95
          dark:bg-neutral-800/85
          dark:text-neutral-300
          dark:hover:bg-white/20
          dark:hover:text-white
        "
      >
        <PiDotsThreeVerticalBold size={29} />
      </button>
    </div>
  );
};

export default ChatHeader;