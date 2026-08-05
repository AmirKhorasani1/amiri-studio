import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, Trash2, X, Ban } from "lucide-react";
import { formatDateTime } from "../utils/helpers";
import { NOTE_COLORS } from "../utils/noteColors";
import EditorToolbar from "./EditorToolbar";

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

export default function NoteModal({ mode, note, onClose, onSave, onDelete, onToggleFavorite, t }) {
  const isEdit = mode === "edit";

  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const [color, setColor] = useState(note?.color ?? null);
  const textareaRef = useRef(null);

  useEffect(() => {
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
    setColor(note?.color ?? null);
  }, [note]);

  const submit = () => {
    if (!title.trim() && !content.trim()) return;
    onSave({ title: title.trim(), content, color });
  };

  return (
    <motion.div
      onClick={onClose}
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto backdrop-blur-[2px] p-4 sm:items-center"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={panelVariants}
        className="w-full max-w-2xl rounded-lg border-primary bg-neutral-950"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-primary px-5 py-3.5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500">
            {isEdit ? (
              <>
                <span>{t.created} {formatDateTime(note.createdAt)}</span>
                <span>{t.updated} {formatDateTime(note.updatedAt)}</span>
              </>
            ) : (
              <span className="text-sm md:text-[15.5px] font-semibold text-neutral-100">{t.newNote}</span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {isEdit && (
              <>
                <button
                  onClick={() => onToggleFavorite(note)}
                  className={`dn-editor-btn ${note.favorite ? "text-amber-400" : "text-neutral-400 hover:text-neutral-100"}`}
                  title={t.favorite}
                >
                  <Star size={16} fill={note.favorite ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={() => onDelete(note)}
                  className="dn-editor-btn text-neutral-400 hover:text-red-400"
                  title={t.delete}
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}
            <button onClick={onClose} className="dn-editor-btn text-neutral-400 hover:text-neutral-100">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 px-4 py-3">
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.titlePlaceholder}
            className="border-b-primary bg-transparent pb-3 text-lg font-semibold text-neutral-100 outline-none placeholder:text-neutral-600"
          />

          {/* Color picker */}
          <div className="flex flex-wrap items-center gap-2 border-b-primary pb-4 pt-1">
            <button
              type="button"
              onClick={() => setColor(null)}
              title={t.noColor}
              className={`flex h-5 w-5 items-center justify-center rounded-full border border-neutral-700 text-neutral-500 duration-150 hover:border-neutral-500 hover:text-neutral-300 ${
                color === null ? "ring-2 ring-neutral-400 ring-offset-2 ring-offset-neutral-950" : ""
              }`}
            >
            </button>
            {NOTE_COLORS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setColor(c.id)}
                title={c.id}
                style={{ backgroundColor: c.hex }}
                className={`h-5 w-5 rounded-full duration-150 hover:scale-110 ${
                  color === c.id ? "ring-2 ring-white ring-offset-2 ring-offset-neutral-950" : ""
                }`}
              />
            ))}
          </div>

          <EditorToolbar
            textareaRef={textareaRef}
            value={content}
            onChange={setContent}
            t={t}
          />

          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t.contentPlaceholder}
            rows={10}
            className="resize-none bg-transparent text-sm leading-relaxed text-neutral-200 outline-none placeholder:text-neutral-600"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 border-t border-[#303030] px-4 py-3">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            {t.cancel}
          </button>
          <button
            onClick={submit}
            disabled={!title.trim() && !content.trim()}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isEdit ? t.save : t.create}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}