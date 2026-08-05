import React from "react";
import { Star, Trash2, StickyNote } from "lucide-react";
import { formatDateTime, truncate } from "../utils/helpers";
import { NOTE_COLORS } from "../utils/noteColors";

export default function NoteCard({ note, onOpen, onToggleFavorite, onDelete, t }) {
  const colorMeta = NOTE_COLORS.find((c) => c.id === note.color);
  const accent = colorMeta?.hex ?? "#6b7280";

  return (
    <div
      onClick={() => onOpen(note)}
      className="dn-note-card group relative cursor-pointer overflow-hidden pl-4"
    >
      {/* Color accent stripe */}
      <span
        className="absolute inset-y-0 left-0 w-[3px]"
        style={{ backgroundColor: colorMeta ? accent : "transparent" }}
      />

      <div className="flex items-start justify-between gap-2 pb-1">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
            style={{
              backgroundColor: colorMeta ? `${accent}22` : "rgba(255,255,255,0.06)",
              color: colorMeta ? accent : "#a3a3a3",
            }}
          >
            <StickyNote size={16} />
          </span>
          <p className="min-w-0 truncate text-sm md:text-[15.5px] font-medium text-neutral-100">
            {note.title || t.untitled}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-0.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note);
            }}
            className="dn-editor-btn text-neutral-500 opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
            title={t.delete}
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(note);
            }}
            className={`dn-editor-btn transition-opacity ${
              note.favorite
                ? "text-amber-400 opacity-100"
                : "text-neutral-500 opacity-0 hover:text-neutral-200 group-hover:opacity-100"
            }`}
            title={t.favorite}
          >
            <Star size={16} fill={note.favorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <p className="mt-1.5 line-clamp-3 min-h-[3.6em] text-[13px] text-neutral-400">
        {note.content ? truncate(note.content, 160) : t.emptyContent}
      </p>

      <p className="mt-3 text-xs font-medium text-neutral-500">
        {t.updated} {formatDateTime(note.updatedAt)}
      </p>
    </div>
  );
}