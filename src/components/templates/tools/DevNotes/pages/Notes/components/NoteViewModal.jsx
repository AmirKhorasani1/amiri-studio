import React from "react";
import { motion } from "framer-motion";
import { Star, Trash2, X, Pencil, StickyNote } from "lucide-react";
import { formatDateTime } from "../utils/helpers";
import { NOTE_COLORS } from "../utils/noteColors";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.12, ease: "easeIn" } },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 6,
    transition: { duration: 0.14, ease: "easeIn" },
  },
};

export default function NoteViewModal({ note, onClose, onEdit, onDelete, onToggleFavorite, t }) {
  const colorMeta = NOTE_COLORS.find((c) => c.id === note.color);
  const accent = colorMeta?.hex ?? "#a3a3a3";

  return (
    <motion.div
      onClick={onClose}
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-black/15 backdrop-blur-[2px] p-4 sm:items-center"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={panelVariants}
        className="w-full max-w-2xl rounded-lg border-primary bg-white dark:bg-neutral-950"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b-primary px-5 py-3.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md"
              style={{
                backgroundColor: colorMeta ? `${accent}24` : "rgba(255,255,255,0.06)",
                color: accent,
              }}
            >
              <StickyNote size={20} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm md:text-[15.5px] font-semibold text-primary">
                {note.title || t.untitled}
              </p>
              <p className="text-xs text-secondary">
                {t.updated} {formatDateTime(note.updatedAt)}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              onClick={() => onToggleFavorite(note)}
              className={`dn-editor-btn ${note.favorite ? "text-amber-400" : "text-secondary"}`}
              title={t.favorite}
            >
              <Star size={16} fill={note.favorite ? "currentColor" : "none"} />
            </button>
            <button
              onClick={() => onDelete(note)}
              className="dn-editor-btn text-secondary hover:text-red-400"
              title={t.delete}
            >
              <Trash2 size={16} />
            </button>
            <button onClick={onClose} className="dn-editor-btn text-secondary">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto px-5 py-4">
          {note.content ? (
            <p className="whitespace-pre-wrap text-sm font-medium leading-relaxed text-neutral-800 dark:text-neutral-200">
              {note.content}
            </p>
          ) : (
            <p className="text-sm text-secondary">{t.emptyContent}</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t-primary px-4 py-3">
          <span className="text-xs text-secondary">
            {t.created} {formatDateTime(note.createdAt)}
          </span>
          <button onClick={() => onEdit(note)} className="btn-primary flex items-center gap-1.5">
            <Pencil size={14} />
            {t.edit}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}