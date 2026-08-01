import { useState, useRef, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { updateConversationStatus } from "@api/conversationApi";

const STATUS_CONFIG = {
  new: { label: "New", dot: "bg-emerald-500", text: "text-emerald-400" },
  opened: { label: "Opened", dot: "bg-amber-500", text: "text-amber-400" },
  closed: { label: "Closed", dot: "bg-neutral-500", text: "text-neutral-400" },
};

const STATUS_OPTIONS = ["new", "opened", "closed"];

const StatusDropdown = ({ conversationId, status }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const ref = useRef(null);

  // بستن dropdown با کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = async (newStatus) => {
    if (newStatus === status) {
      setIsOpen(false);
      return;
    }

    setUpdating(true);
    try {
      await updateConversationStatus(conversationId, newStatus);
      // آپدیت UI از طریق socket event "conversation-updated" میاد، نیازی به setState دستی نیست
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdating(false);
      setIsOpen(false);
    }
  };

  const current = STATUS_CONFIG[status] ?? STATUS_CONFIG.new;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen((o) => !o)}
        disabled={updating}
        className="flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-xs font-medium text-neutral-200 transition-colors hover:bg-neutral-800 disabled:opacity-50"
      >
        <span className={`h-1.5 w-1.5 rounded-full ${current.dot}`} />
        <span className={current.text}>{current.label}</span>
        <HiChevronDown size={12} className="text-neutral-500" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-10 mt-1.5 w-32 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 py-1 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
          {STATUS_OPTIONS.map((key) => {
            const opt = STATUS_CONFIG[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className="flex w-full items-center gap-2 px-3 py-2 text-xs text-neutral-200 transition-colors hover:bg-neutral-800"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${opt.dot}`} />
                {opt.label}
                {key === status && <span className="mr-auto text-neutral-500">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;