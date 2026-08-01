// ChatProfile.jsx
import React from "react";
import {
  HiArrowLeft,
  HiOutlineClock,
  HiOutlineEnvelope,
  HiOutlinePhone,
} from "react-icons/hi2";

const ChatProfile = ({ avatarUrl, name, subtitle, bio, email, phone, onBack }) => {
  return (
    <div className="flex h-full flex-col overflow-y-auto no-scrollbar pb-8 pt-18">
      <button
        onClick={onBack}
        aria-label="Back to chat"
        className="flex h-12.5 w-12.5 bg-neutral-800/80 items-center justify-center self-start rounded-full text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-white"
      >
        <HiArrowLeft size={18} />
      </button>

      <div className="flex flex-col items-center px-6 text-center">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="h-60 w-60 rounded-full object-cover ring-1 ring-neutral-800"
          />
        ) : (
          <div className="flex h-60 w-60 items-center justify-center rounded-3xl bg-white/10 text-5xl font-semibold text-white ring-1 ring-neutral-800">
            {name?.charAt(0)}
          </div>
        )}

        <h2 className="mt-5 text-xl font-semibold text-white">{name}</h2>

        {subtitle && (
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-neutral-500">
            <HiOutlineClock size={13} />
            <span>{subtitle}</span>
          </div>
        )}

        {bio && (
          <p className="mt-4 text-sm leading-relaxed text-neutral-400">{bio}</p>
        )}
      </div>

      {(email || phone) && (
        <div className="mt-6 flex flex-col gap-2 px-6">
          <p className="mb-1 px-1 text-[11px] font-medium uppercase tracking-wide text-neutral-600">
            Contact
          </p>

          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-3 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-3 transition-colors hover:bg-neutral-800"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                <HiOutlinePhone size={16} />
              </div>
              <div className="min-w-0 flex-1 text-right">
                <p className="text-[11px] text-neutral-500">Phone</p>
                <p dir="ltr" className="truncate text-right text-sm text-neutral-100">
                  {phone}
                </p>
              </div>
            </a>
          )}

          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-3 transition-colors hover:bg-neutral-800"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                <HiOutlineEnvelope size={16} />
              </div>
              <div className="min-w-0 flex-1 text-right">
                <p className="text-[11px] text-neutral-500">Email</p>
                <p dir="ltr" className="truncate text-right text-sm text-neutral-100">
                  {email}
                </p>
              </div>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatProfile;