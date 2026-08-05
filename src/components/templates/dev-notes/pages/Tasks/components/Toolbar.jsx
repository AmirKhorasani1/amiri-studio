import React from "react";
import {
  Search,
  ArrowUpDown,
  ListFilter,
  List as ListIcon,
  LayoutGrid,
  Plus,
} from "lucide-react";
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
    <div dir={dir} className="flex w-full flex-col gap-10">
      {/* Top row: header info + search + new task */}
      <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
            {title}
          </h1>
          <div className="mt-1.5 flex items-center gap-3">
            <p className="text-sm text-neutral-400">{taskCount} Tasks</p>
            <span className="h-1 w-1 rounded-full bg-neutral-600" />
            <p className="text-sm text-neutral-400">{completedToday} Completed Today</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="dn-search-wrap">
            <Search size={16} className="shrink-0 text-neutral-300" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="dn-search-input"
            />
          </div>

          <button onClick={onNewTask} className="dn-btn-new">
            <Plus size={16} />
            {t.newTask}
          </button>
        </div>
      </div>

      {/* Bottom row: status tabs + sort/group/view controls */}
      <div className="flex flex-wrap items-center justify-between gap-3.5">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setStatusFilter("all")}
            className={`dn-tab ${statusFilter === "all" ? "dn-tab-active" : "dn-tab-inactive"}`}
          >
            {t.all}
          </button>
          {Object.keys(STATUSES).map((key) => (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`dn-tab ${statusFilter === key ? "dn-tab-active" : "dn-tab-inactive"}`}
            >
              {t.statusLabels[key]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3.5">
          <div className="dn-select-pill">
            <ArrowUpDown size={16} className="text-neutral-100" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="dn-select"
            >
              <option value="dueDate">{t.sortDueDate}</option>
              <option value="created">{t.sortCreated}</option>
            </select>
          </div>

          {view === "list" && (
            <div className="dn-select-pill">
              <ListFilter size={16} className="text-neutral-100" />
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
                className="dn-select"
              >
                <option value="status">{t.groupStatus}</option>
                <option value="date">{t.groupDate}</option>
              </select>
            </div>
          )}

          <span className="dn-divider" />

          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("list")}
              className={`dn-icon-toggle ${view === "list" ? "dn-icon-toggle-active" : "dn-icon-toggle-inactive"}`}
              title={t.listView}
            >
              <img width={23} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCAgZD0iTTggNWgxMiIvPjxwYXRoICAgZD0iTTQgNWguMDA5TTQgMTJoLjAwOU00IDE5aC4wMDkiLz48cGF0aCAgZD0iTTggMTJoMTJNOCAxOWgxMiIvPjwvc3ZnPg==" />
            </button>
            <button
              onClick={() => setView("board")}
              className={`dn-icon-toggle ${view === "board" ? "dn-icon-toggle-active" : "dn-icon-toggle-inactive"}`}
              title={t.boardView}
            >
              <img width={23} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBmaWxsPSJub25lIiAgICBkPSJNMy44ODkgOS42NjNDNC4zOTMgMTAgNS4wOTYgMTAgNi41IDEwczIuMTA3IDAgMi42MTEtLjMzN2EyIDIgMCAwIDAgLjU1Mi0uNTUyQzEwIDguNjA3IDEwIDcuOTA0IDEwIDYuNXMwLTIuMTA3LS4zMzctMi42MTFhMiAyIDAgMCAwLS41NTItLjU1MkM4LjYwNyAzIDcuOTA0IDMgNi41IDNzLTIuMTA3IDAtMi42MTEuMzM3YTIgMiAwIDAgMC0uNTUyLjU1MkMzIDQuMzkzIDMgNS4wOTYgMyA2LjVzMCAyLjEwNy4zMzcgMi42MTFhMiAyIDAgMCAwIC41NTIuNTUyWm0xMSAwQzE1LjM5MyAxMCAxNi4wOTYgMTAgMTcuNSAxMHMyLjEwNyAwIDIuNjExLS4zMzdhMiAyIDAgMCAwIC41NTItLjU1MkMyMSA4LjYwNyAyMSA3LjkwNCAyMSA2LjVzMC0yLjEwNy0uMzM3LTIuNjExYTIgMiAwIDAgMC0uNTUyLS41NTJDMTkuNjA3IDMgMTguOTA0IDMgMTcuNSAzcy0yLjEwNyAwLTIuNjExLjMzN2EyIDIgMCAwIDAtLjU1Mi41NTJDMTQgNC4zOTMgMTQgNS4wOTYgMTQgNi41czAgMi4xMDcuMzM3IDIuNjExYTIgMiAwIDAgMCAuNTUyLjU1MlptLTExIDExQzQuMzkzIDIxIDUuMDk2IDIxIDYuNSAyMXMyLjEwNyAwIDIuNjExLS4zMzdhMiAyIDAgMCAwIC41NTItLjU1MkMxMCAxOS42MDcgMTAgMTguOTA0IDEwIDE3LjVzMC0yLjEwNy0uMzM3LTIuNjExYTIgMiAwIDAgMC0uNTUyLS41NTJDOC42MDcgMTQgNy45MDQgMTQgNi41IDE0cy0yLjEwNyAwLTIuNjExLjMzN2EyIDIgMCAwIDAtLjU1Mi41NTJDMyAxNS4zOTMgMyAxNi4wOTYgMyAxNy41czAgMi4xMDcuMzM3IDIuNjExYTIgMiAwIDAgMCAuNTUyLjU1MlptMTEgMEMxNS4zOTMgMjEgMTYuMDk2IDIxIDE3LjUgMjFzMi4xMDcgMCAyLjYxMS0uMzM3Yy4yMTgtLjE0Ni40MDYtLjMzNC41NTItLjU1MkMyMSAxOS42MDcgMjEgMTguOTA0IDIxIDE3LjVzMC0yLjEwNy0uMzM3LTIuNjExYTIgMiAwIDAgMC0uNTUyLS41NTJDMTkuNjA3IDE0IDE4LjkwNCAxNCAxNy41IDE0cy0yLjEwNyAwLTIuNjExLjMzN2EyIDIgMCAwIDAtLjU1Mi41NTJDMTQgMTUuMzkzIDE0IDE2LjA5NiAxNCAxNy41czAgMi4xMDcuMzM3IDIuNjExYy4xNDYuMjE4LjMzNC40MDYuNTUyLjU1MloiLz48L3N2Zz4=" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}