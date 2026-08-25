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
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-17 md:py-25 pb-24 md:pb-25">
        
        {/* Header / Toolbar Row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="hidden sm:block">
            <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
              {t.pageTitle}
            </h1>
            <div className="mt-1.5 flex items-center gap-3">
              <p className="text-sm text-secondary">
                {notes.length} {t.notesCount}
              </p>
              <span className="h-1 w-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              <p className="text-sm text-secondary">
                {favoritesCount} {t.favoritesCount}
              </p>
            </div>
          </div>

          {/* Desktop Search & New Note Button */}
          <div className="hidden md:flex items-center gap-3.5">
            <div className="dn-search-wrap shadow-sm">
              <Search size={18} className="shrink-0 text-neutral-500 dark:text-neutral-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="dn-search-input"
              />
            </div>
            <button onClick={() => setShowCreate(true)} className="dn-btn-new shrink-0">
              {t.newNote}
            </button>
          </div>

          {/* Mobile Floating Action Button (+) */}
          <button
            type="button"
            onClick={() => setShowCreate(true)}
            className="md:hidden fixed right-3.5 top-5.5 z-40 bg-white dark:bg-neutral-700/70 backdrop-blur-xl p-2 rounded-full active:scale-95 duration-300"
          >
            <img className="invert dark:invert-0" width={29} height={29} alt="Add" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBmaWxsPSJub25lIiAgICAgZD0iTTEyLjAwMSA1djE0LjAwMm03LjAwMS03SDUiLz48L3N2Zz4=" />
          </button>

          {/* Mobile Bottom Search Bar */}
          <div className="md:hidden fixed bottom-5.5 right-0 left-0 w-full px-5 z-30">
            <div className="dn-search-wrap shadow-lg">
              <Search size={20} className="shrink-0 text-secondary" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="dn-search-input"
              />
            </div>
          </div>
        </div>

        {/* Filters Row (All & Favorites) */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar w-full pb-1">
          <button
            onClick={() => setFilter("all")}
            className={`dn-tab shrink-0 whitespace-nowrap ${filter === "all" ? "dn-tab-active" : "dn-tab-inactive"}`}
          >
            {t.all}
          </button>
          <button
            onClick={() => setFilter("favorites")}
            className={`dn-tab shrink-0 whitespace-nowrap ${filter === "favorites" ? "dn-tab-active" : "dn-tab-inactive"}`}
          >
            {t.favoritesTab}
          </button>
        </div>

        {/* Notes Grid */}
        {visibleNotes.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 w-full">
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
          <div className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-800 py-16 text-center text-sm text-secondary">
            {notes.length === 0 ? t.emptyState : t.emptyStateFiltered}
          </div>
        )}
      </div>

      {/* Create Modal */}
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

      {/* Read-only Detail Modal */}
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

      {/* Full Editor Modal */}
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