import React from "react";
import {
  HiCamera,
  HiOutlineDocument,
  HiOutlineMapPin,
  HiOutlineUser,
} from "react-icons/hi2";

const OPTIONS = [
  { key: "media", label: "Photo or video", icon: HiCamera },
  { key: "document", label: "File", icon: HiOutlineDocument },
  { key: "location", label: "Location", icon: HiOutlineMapPin },
  { key: "contact", label: "Contact", icon: HiOutlineUser },
];

const AttachmentMenu = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute bottom-14 left-0 z-50 w-52 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 py-1 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
        {OPTIONS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => {
              onSelect(key);
              onClose();
            }}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-neutral-100 transition-colors hover:bg-neutral-800"
          >
            <Icon size={18} className="text-neutral-400" />
            {label}
          </button>
        ))}
      </div>
    </>
  );
};

export default AttachmentMenu;