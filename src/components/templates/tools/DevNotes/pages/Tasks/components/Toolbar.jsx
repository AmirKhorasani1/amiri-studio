import React from "react";
import { Search } from "lucide-react";
import { STATUSES } from "../utils/constants";
import { useLanguage } from "@context/LanguageContext";

const translations = {
  en: {
    searchPlaceholder: "Search tasks…",
    newTask: "New Task",
    all: "All",
    statusLabels: {
      todo: "Todo",
      "in-progress": "In Progress",
      completed: "Completed",
    },
    sortDueDate: "Due Date",
    sortCreated: "Created",
    groupStatus: "Group: Status",
    groupDate: "Group: Due Date",
    listView: "List view",
    boardView: "Board view",
  },
  fa: {
    searchPlaceholder: "جستجوی وظایف…",
    newTask: "وظیفه جدید",
    all: "همه",
    statusLabels: {
      todo: "انجام‌نشده",
      "in-progress": "در حال انجام",
      completed: "تکمیل‌شده",
    },
    sortDueDate: "تاریخ سررسید",
    sortCreated: "تاریخ ایجاد",
    groupStatus: "گروه‌بندی: وضعیت",
    groupDate: "گروه‌بندی: سررسید",
    listView: "نمای لیست",
    boardView: "نمای برد",
  },
};

export default function Toolbar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  groupBy,
  setGroupBy,
  view,
  setView,
  onNewTask,
  title,
  taskCount,
  completedToday,
}) {
  const { language } = useLanguage();
  const t = translations[language];
  const dir = language === "fa" ? "rtl" : "ltr";

  return (
    <div dir={dir} className="flex w-full flex-col gap-6">
      {/* Top row: header info + search + new task */}
      <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="hidden md:block">
          <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1.5 text-sm text-secondary">
            {taskCount} Tasks · {completedToday} Completed Today
          </p>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3.5">
          <div className="dn-search-wrap">
            <Search size={20} className="shrink-0 text-neutral-600 dark:text-neutral-300" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="dn-search-input"
            />
          </div>
          <button onClick={onNewTask} className="dn-btn-new">
            {t.newTask}
          </button>
        </div>

        <div dir="rtl" className="md:hidden flex fixed right-3.5 top-5.5 z-40 bg-white dark:bg-neutral-700/70 backdrop-blur-xl rounded-full active:scale-95 duration-300">
        {/* Mobile FAB (Floating Action Button) */}
        <button
          type="button"
          onClick={onNewTask}
          className="flex items-center justify-center p-2"
        >
          <img className="invert dark:invert-0" width={29} height={29} alt="Add" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBmaWxsPSJub25lIiAgICAgZD0iTTEyLjAwMSA1djE0LjAwMm03LjAwMS03SDUiLz48L3N2Zz4=" />
        </button>

        {/* View Toggles */}
          <button
            onClick={() => setView(view === "list" ? "board" : "list")}
            className="flex items-center justify-center p-2 pl-3.5 -mr-1"
            title={view === "list" ? t.boardView : t.listView}
          >
            {view === "list" ? (
              <img className="invert dark:invert-0" width={23.5} alt="Board" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBmaWxsPSJub25lIiAgICBkPSJNMy44ODkgOS42NjNDNC4zOTMgMTAgNS4wOTYgMTAgNi41IDEwczIuMTA3IDAgMi42MTEtLjMzN2EyIDIgMCAwIDAgLjU1Mi0uNTUyQzEwIDguNjA3IDEwIDcuOTA0IDEwIDYuNXMwLTIuMTA3LS4zMzctMi42MTFhMiAyIDAgMCAwLS41NTItLjU1MkM4LjYwNyAzIDcuOTA0IDMgNi41IDNzLTIuMTA3IDAtMi42MTEuMzM3YTIgMiAwIDAgMC0uNTUyLjU1MkMzIDQuMzkzIDMgNS4wOTYgMyA2LjVzMCAyLjEwNy4zMzcgMi42MTFhMiAyIDAgMCAwIC41NTIuNTUyWm0xMSAwQzE1LjM5MyAxMCAxNi4wOTYgMTAgMTcuNSAxMHMyLjEwNyAwIDIuNjExLS4zMzdhMiAyIDAgMCAwIC41NTItLjU1MkMyMSA4LjYwNyAyMSA3LjkwNCAyMSA2LjVzMC0yLjEwNy0uMzM3LTIuNjExYTIgMiAwIDAgMC0uNTUyLS41NTJDMTkuNjA3IDMgMTguOTA0IDMgMTcuNSAzcy0yLjEwNyAwLTIuNjExLjMzN2EyIDIgMCAwIDAtLjU1Mi41NTJDMTQgNC4zOTMgMTQgNS4wOTYgMTQgNi41czAgMi4xMDcuMzM3IDIuNjExYTIgMiAwIDAgMCAuNTUyLjU1MlptLTExIDExQzQuMzkzIDIxIDUuMDk2IDIxIDYuNSAyMXMyLjEwNyAwIDIuNjExLS4zMzdhMiAyIDAgMCAwIC41NTItLjU1MkMxMCAxOS42MDcgMTAgMTguOTA0IDEwIDE3LjVzMC0yLjEwNy0uMzM3LTIuNjExYTIgMiAwIDAgMC0uNTUyLS41NTJDOC42MDcgMTQgNy45MDQgMTQgNi41IDE0cy0yLjEwNyAwLTIuNjExLjMzN2EyIDIgMCAwIDAtLjU1Mi41NTJDMyAxNS4zOTMgMyAxNi4wOTYgMyAxNy41czAgMi4xMDcuMzM3IDIuNjExYTIgMiAwIDAgMCAuNTUyLjU1MlptMTEgMEMxNS4zOTMgMjEgMTYuMDk2IDIxIDE3LjUgMjFzMi4xMDcgMCAyLjYxMS0uMzM3Yy4yMTgtLjE0Ni40MDYtLjMzNC41NTItLjU1MkMyMSAxOS42MDcgMjEgMTguOTA0IDIxIDE3LjVzMC0yLjEwNy0uMzM3LTIuNjExYTIgMiAwIDAgMC0uNTUyLS41NTJDMTkuNjA3IDE0IDE4LjkwNCAxNCAxNy41IDE0cy0yLjEwNyAwLTIuNjExLjMzN2EyIDIgMCAwIDAtLjU1Mi41NTJDMTQgMTUuMzkzIDE0IDE2LjA5NiAxNCAxNy41czAgMi4xMDcuMzM3IDIuNjExYy4xNDYuMjE4LjMzNC40MDYuNTUyLjU1MloiLz48L3N2Zz4=" />
            ) : (
              <img className="invert dark:invert-0" width={23.5} alt="List" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCAgZD0iTTggNWgxMiIvPjxwYXRoICAgZD0iTTQgNWguMDA5TTQgMTJoLjAwOU00IDE5aC4wMDkiLz48cGF0aCAgZD0iTTggMTJoMTJNOCAxOWgxMiIvPjwvc3ZnPg==" />
            )}
          </button>
        </div>

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

      {/* Bottom row: status tabs + sort/group/view controls */}
      <div className="flex gap-2 md:gap-3 sm:items-center overflow-x-scroll hide-scrollbar w-full pb-1">
        {/* Status Tabs */}
        <button
          onClick={() => setStatusFilter("all")}
          className={`dn-tab shrink-0 whitespace-nowrap ${statusFilter === "all" ? "dn-tab-active" : "dn-tab-inactive"}`}
        >
          {t.all}
        </button>
        {Object.keys(STATUSES).map((key) => (
          <button
            key={key}
            onClick={() => setStatusFilter(key)}
            className={`dn-tab shrink-0 whitespace-nowrap ${statusFilter === key ? "dn-tab-active" : "dn-tab-inactive"}`}
          >
            {t.statusLabels[key]}
          </button>
        ))}

        <div className="w-px h-5 bg-neutral-300 dark:bg-neutral-800 shrink-0 hidden sm:block mx-1"></div>

        {/* Sorts & Groups */}
        <button
          onClick={() => setSortBy("dueDate")}
          className={`dn-tab shrink-0 whitespace-nowrap ${sortBy === "dueDate" ? "dn-tab-active" : "dn-tab-inactive"}`}
        >
          {t.sortDueDate}
        </button>
        <button
          onClick={() => setSortBy("createdAt")}
          className={`dn-tab shrink-0 whitespace-nowrap ${sortBy === "createdAt" ? "dn-tab-active" : "dn-tab-inactive"}`}
        >
          {t.sortCreated}
        </button>

        {view === "list" && (
          <>
            <div className="w-px h-5 bg-neutral-300 dark:bg-neutral-800 shrink-0 hidden sm:block mx-1"></div>
            <button
              onClick={() => setGroupBy("status")}
              className={`dn-tab shrink-0 whitespace-nowrap ${groupBy === "status" ? "dn-tab-active" : "dn-tab-inactive"}`}
            >
              {t.groupStatus}
            </button>
            <button
              onClick={() => setGroupBy("date")}
              className={`dn-tab shrink-0 whitespace-nowrap ${groupBy === "date" ? "dn-tab-active" : "dn-tab-inactive"}`}
            >
              {t.groupDate}
            </button>
          </>
        )}
      </div>
    </div>
  );
}