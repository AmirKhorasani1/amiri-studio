import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useLanguage } from "@context/LanguageContext";
import { uid, nowISO } from "./utils/helpers";
import { loadNotes, saveNotes } from "./utils/storage";
import NoteCard from "./components/NoteCard";
import NoteModal from "./components/NoteModal";
import NoteViewModal from "./components/NoteViewModal";

const translations = {
  en: {
    pageTitle: "Notes",
    notesCount: "Notes",
    favoritesCount: "Favorites",
    searchPlaceholder: "Search notes…",
    newNote: "New Note",
    all: "All",
    favoritesTab: "Favorites",
    emptyContent: "No content yet",
    emptyState: "No notes yet — create your first one.",
    emptyStateFiltered: "No notes match your filters.",
    untitled: "Untitled",
    updated: "Updated",
    created: "Created",
    favorite: "Favorite",
    delete: "Delete",
    edit: "Edit",
    titlePlaceholder: "Note title",
    contentPlaceholder: "Start writing…",
    cancel: "Cancel",
    save: "Save",
    create: "Create",
    color: "Color",
    noColor: "No color",
    bold: "Bold",
    italic: "Italic",
    heading: "Heading",
    bullet: "Bulleted list",
    number: "Numbered list",
    code: "Code",
    quote: "Quote",
    link: "Link",
  },
  fa: {
    pageTitle: "یادداشت‌ها",
    notesCount: "یادداشت",
    favoritesCount: "مورد علاقه",
    searchPlaceholder: "جستجوی یادداشت‌ها…",
    newNote: "یادداشت جدید",
    all: "همه",
    favoritesTab: "علاقه‌مندی‌ها",
    emptyContent: "هنوز محتوایی نیست",
    emptyState: "هنوز یادداشتی نیست — اولین یادداشتت رو بساز.",
    emptyStateFiltered: "یادداشتی مطابق فیلترها پیدا نشد.",
    untitled: "بدون عنوان",
    updated: "بروزرسانی",
    created: "ایجاد",
    favorite: "علاقه‌مندی",
    delete: "حذف",
    edit: "ویرایش",
    titlePlaceholder: "عنوان یادداشت",
    contentPlaceholder: "شروع به نوشتن کن…",
    cancel: "انصراف",
    save: "ذخیره",
    create: "ایجاد",
    color: "رنگ",
    noColor: "بدون رنگ",
    bold: "بولد",
    italic: "ایتالیک",
    heading: "تیتر",
    bullet: "لیست نقطه‌ای",
    number: "لیست شماره‌دار",
    code: "کد",
    quote: "نقل‌قول",
    link: "لینک",
  },
};

export default function NotesApp() {
  const { language } = useLanguage();
  const t = translations[language];
  const dir = language === "fa" ? "rtl" : "ltr";

  const [notes, setNotes] = useState(loadNotes);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | favorites
  const [viewingNote, setViewingNote] = useState(null); // read-only detail modal
  const [editingNote, setEditingNote] = useState(null); // full editor modal
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const createNote = useCallback((fields) => {
    const note = {
      id: uid(),
      title: fields.title,
      content: fields.content,
      color: fields.color ?? null,
      favorite: false,
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    setNotes((prev) => [note, ...prev]);
    setShowCreate(false);
  }, []);

  const updateNote = useCallback((id, fields) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...fields, updatedAt: nowISO() } : n))
    );
    setEditingNote(null);
  }, []);

  const deleteNote = useCallback((note) => {
    setNotes((prev) => prev.filter((n) => n.id !== note.id));
    setViewingNote((prev) => (prev && prev.id === note.id ? null : prev));
    setEditingNote((prev) => (prev && prev.id === note.id ? null : prev));
  }, []);

  const toggleFavorite = useCallback((note) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === note.id ? { ...n, favorite: !n.favorite, updatedAt: nowISO() } : n
      )
    );
    setViewingNote((prev) =>
      prev && prev.id === note.id ? { ...prev, favorite: !prev.favorite } : prev
    );
    setEditingNote((prev) =>
      prev && prev.id === note.id ? { ...prev, favorite: !prev.favorite } : prev
    );
  }, []);

  // Switch from the read-only view modal into the full editor.
  const startEditing = useCallback((note) => {
    setEditingNote(note);
    setViewingNote(null);
  }, []);

  const favoritesCount = notes.filter((n) => n.favorite).length;

  const visibleNotes = useMemo(() => {
    let list = notes;

    if (filter === "favorites") {
      list = list.filter((n) => n.favorite);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
      );
    }

    return [...list].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
  }, [notes, filter, search]);

  return (
    <div dir={dir} className="min-h-screen w-full text-black dark:text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:gap-10 px-4 py-25">
        {/* Header */}
        <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="hidden md:block">
            <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
              {t.pageTitle}
            </h1>
            <div className="mt-1.5 flex items-center gap-3">
              <p className="text-sm text-secondary">
                {notes.length} {t.notesCount}
              </p>
              <span className="h-1 w-1 rounded-full bg-neutral-600" />
              <p className="text-sm text-secondary">
                {favoritesCount} {t.favoritesCount}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 -mt-3 md:mt-0">
            <div className="dn-search-wrap">
              <Search size={15} className="shrink-0 text-neutral-600 dark:text-neutral-300" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="dn-search-input"
              />
            </div>
            <button onClick={() => setShowCreate(true)} className="dn-btn-new hidden md:block">
              {t.newNote}
            </button>
          </div>
        </div>

        <button onClick={() => setShowCreate(true)} className="fixed py-3.5 px-4.5 bottom-5 ltr:left-4 rtl:right-4 z-40 dn-btn-new md:hidden">
          {t.newNote}
        </button>

        {/* Favorites tabs */}
        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={() => setFilter("all")}
            className={`dn-tab ${filter === "all" ? "dn-tab-active" : "dn-tab-inactive"}`}
          >
            {t.all}
          </button>
          <button
            onClick={() => setFilter("favorites")}
            className={`dn-tab ${filter === "favorites" ? "dn-tab-active" : "dn-tab-inactive"}`}
          >
            {t.favoritesTab}
          </button>
        </div>

        {/* Notes grid */}
        {visibleNotes.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visibleNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onOpen={setViewingNote}
                onToggleFavorite={toggleFavorite}
                onDelete={deleteNote}
                t={t}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-neutral-800 py-16 text-center text-sm text-neutral-600">
            {notes.length === 0 ? t.emptyState : t.emptyStateFiltered}
          </div>
        )}
      </div>

      {/* Create modal */}
      <AnimatePresence>
        {showCreate && (
          <NoteModal
            key="create"
            mode="create"
            note={null}
            onClose={() => setShowCreate(false)}
            onSave={createNote}
            t={t}
          />
        )}
      </AnimatePresence>

      {/* Read-only detail modal, opened from card click */}
      <AnimatePresence>
        {viewingNote && !editingNote && (
          <NoteViewModal
            key={`view-${viewingNote.id}`}
            note={notes.find((n) => n.id === viewingNote.id) ?? viewingNote}
            onClose={() => setViewingNote(null)}
            onEdit={startEditing}
            onDelete={deleteNote}
            onToggleFavorite={toggleFavorite}
            t={t}
          />
        )}
      </AnimatePresence>

      {/* Full editor modal, opened via the Edit button */}
      <AnimatePresence>
        {editingNote && (
          <NoteModal
            key={`edit-${editingNote.id}`}
            mode="edit"
            note={notes.find((n) => n.id === editingNote.id) ?? editingNote}
            onClose={() => setEditingNote(null)}
            onSave={(fields) => updateNote(editingNote.id, fields)}
            onDelete={deleteNote}
            onToggleFavorite={toggleFavorite}
            t={t}
          />
        )}
      </AnimatePresence>
    </div>
  );
}