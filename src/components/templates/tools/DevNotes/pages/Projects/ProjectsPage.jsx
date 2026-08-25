import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useLanguage } from "@context/LanguageContext";
import { uid, nowISO, loadProjects, saveProjects } from "./utils/projectStorage";
import { PROJECT_COLORS, PROJECT_STATUSES, PROJECT_SORTS } from "./utils/projectConstants";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import ProjectDetailModal from "./components/ProjectDetailModal";
import { IoIosAdd } from "react-icons/io";

const translations = {
  en: {
    pageTitle: "Projects",
    projectsCount: "Projects",
    searchPlaceholder: "Search projects…",
    newProject: "New Project",
    editProject: "Edit Project",
    namePlaceholder: "Project name",
    descriptionPlaceholder: "Add a description…",
    noDescription: "No description",
    color: "Color",
    icon: "Icon",
    cancel: "Cancel",
    save: "Save",
    create: "Create",
    delete: "Delete",
    edit: "Edit",
    newTask: "Add",
    taskPlaceholder: "Add a task…",
    noTasks: "No tasks yet",
    tasksLabel: "tasks",
    updated: "Updated",
    created: "Created",
    all: "All",
    emptyState: "No projects yet — create your first one.",
    emptyStateFiltered: "No projects match your filters.",
    status: "Status",
    statusLabels: {
      planning: "Planning",
      active: "Active",
      completed: "Completed",
      archived: "Archived",
    },
    techStack: "Tech Stack",
    techStackPlaceholder: "Type and press Enter",
    sortLabel: "Sort",
    sortOptions: {
      updated: "Recently Updated",
      created: "Recently Created",
      name: "Name A–Z",
    },
    archive: "Archive",
    unarchive: "Restore",
  },
  fa: {
    pageTitle: "پروژه‌ها",
    projectsCount: "پروژه",
    searchPlaceholder: "جستجوی پروژه‌ها…",
    newProject: "پروژه جدید",
    editProject: "ویرایش پروژه",
    namePlaceholder: "نام پروژه",
    descriptionPlaceholder: "توضیحاتی بنویس…",
    noDescription: "بدون توضیحات",
    color: "رنگ",
    icon: "آیکون",
    cancel: "انصراف",
    save: "ذخیره",
    create: "ایجاد",
    delete: "حذف",
    edit: "ویرایش",
    newTask: "افزودن",
    taskPlaceholder: "یک تسک اضافه کن…",
    noTasks: "هنوز تسکی اضافه نشده",
    tasksLabel: "تسک",
    updated: "بروزرسانی",
    created: "ایجاد",
    all: "همه",
    emptyState: "هنوز پروژه‌ای نیست — اولین پروژه‌ات رو بساز.",
    emptyStateFiltered: "پروژه‌ای مطابق فیلترها پیدا نشد.",
    status: "وضعیت",
    statusLabels: {
      planning: "برنامه‌ریزی",
      active: "فعال",
      completed: "تکمیل‌شده",
      archived: "بایگانی‌شده",
    },
    techStack: "تکنولوژی‌ها",
    techStackPlaceholder: "بنویس و Enter بزن",
    sortLabel: "مرتب‌سازی",
    sortOptions: {
      updated: "آخرین بروزرسانی",
      created: "تاریخ ایجاد",
      name: "نام (الف تا ی)",
    },
    archive: "بایگانی",
    unarchive: "بازگردانی",
  },
};

export default function ProjectsPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const dir = language === "fa" ? "rtl" : "ltr";

  const [projects, setProjects] = useState(loadProjects);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [colorFilter, setColorFilter] = useState(null);
  const [sortBy, setSortBy] = useState("updated");
  const [viewingId, setViewingId] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  const createProject = useCallback((fields) => {
    const project = {
      id: uid(),
      name: fields.name,
      description: fields.description ?? "",
      color: fields.color,
      icon: fields.icon,
      status: fields.status ?? "active",
      techStack: fields.techStack ?? [],
      tasks: [],
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    setProjects((prev) => [project, ...prev]);
    setShowCreate(false);
  }, []);

  const updateMeta = useCallback((id, fields) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...fields, updatedAt: nowISO() } : p))
    );
    setEditingProject(null);
  }, []);

  const updateStatus = useCallback((id, status) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status, updatedAt: nowISO() } : p))
    );
  }, []);

  const deleteProject = useCallback((project) => {
    setProjects((prev) => prev.filter((p) => p.id !== project.id));
    setViewingId((prev) => (prev === project.id ? null : prev));
    setEditingProject((prev) => (prev && prev.id === project.id ? null : prev));
  }, []);

  const updateDescription = useCallback((id, description) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, description, updatedAt: nowISO() } : p))
    );
  }, []);

  const addTask = useCallback((projectId, text) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              tasks: [
                ...p.tasks,
                { id: uid(), text, done: false, createdAt: nowISO(), updatedAt: nowISO() },
              ],
              updatedAt: nowISO(),
            }
          : p
      )
    );
  }, []);

  const toggleTask = useCallback((projectId, taskId) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              tasks: p.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, done: !task.done, updatedAt: nowISO() }
                  : task
              ),
              updatedAt: nowISO(),
            }
          : p
      )
    );
  }, []);

  const deleteTask = useCallback((projectId, taskId) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, tasks: p.tasks.filter((task) => task.id !== taskId), updatedAt: nowISO() }
          : p
      )
    );
  }, []);

  const startEditing = useCallback((project) => {
    setEditingProject(project);
  }, []);

  const visibleProjects = useMemo(() => {
    let list = projects;

    if (statusFilter) {
      list = list.filter((p) => p.status === statusFilter);
    }
    if (colorFilter) {
      list = list.filter((p) => p.color === colorFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q) ||
          (p.techStack ?? []).some((tech) => tech.toLowerCase().includes(q))
      );
    }

    const sorted = [...list];
    if (sortBy === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "created") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }
    return sorted;
  }, [projects, search, statusFilter, colorFilter, sortBy]);

  const viewingProject = projects.find((p) => p.id === viewingId) ?? null;

  return (
    <div dir={dir} className="min-h-screen w-full text-black dark:text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-17 md:py-25">
        {/* Header */}
        <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="hidden md:block">
            <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">{t.pageTitle}</h1>
            <p className="mt-1.5 text-sm text-secondary">
              {projects.length} {t.projectsCount}
            </p>
          </div>

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
            <button onClick={() => setShowCreate(true)} className="dn-btn-new">
              {t.newProject}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowCreate(true)}
            className="md:hidden fixed right-3.5 top-5.5 z-40 bg-white dark:bg-neutral-700/70 backdrop-blur-xl p-2 rounded-full active:scale-95 duration-300"
          >
            <img className="invert dark:invert-0" width={29} height={29} alt="" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBmaWxsPSJub25lIiAgICAgZD0iTTEyLjAwMSA1djE0LjAwMm03LjAwMS03SDUiLz48L3N2Zz4=" />
          </button>

          <div className="fixed bottom-5.5 right-0 left-0 w-full px-5">
            <div className="dn-search-wrap">
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

        {/* Status tabs + Sort */}
        <div className="flex gap-2 md:gap-3 sm:items-center overflow-x-scroll hide-scrollbar w-full">
          <button
            onClick={() => setStatusFilter(null)}
            className={`dn-tab ${statusFilter === null ? "dn-tab-active" : "dn-tab-inactive"}`}
          >
            {t.all}
          </button>
          {PROJECT_STATUSES.map((s) => (
            <button
              key={s.id}
              onClick={() => setStatusFilter((prev) => (prev === s.id ? null : s.id))}
              className={`dn-tab ${statusFilter === s.id ? "dn-tab-active" : "dn-tab-inactive"}`}
            >
              {t.statusLabels[s.id]}
            </button>
          ))}
        </div>

        {/* Color filter */}
        <div className="flex items-center gap-2">
          {PROJECT_COLORS.map((c) => (
            <button
              key={c.id}
              onClick={() => setColorFilter((prev) => (prev === c.id ? null : c.id))}
              title={c.id}
              style={{ backgroundColor: c.hex }}
              className={`h-6 w-6 rounded-full duration-150 hover:scale-110 ${
                colorFilter === c.id
                  ? "ring-2 ring-black dark:ring-white ring-offset-2 ring-offset-neutral-100 dark:ring-offset-black"
                  : ""
              }`}
            />
          ))}
          {colorFilter && (
            <button
              onClick={() => setColorFilter(null)}
              className="dn-editor-btn text-secondary"
              title={t.all}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Projects grid */}
        {visibleProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={(p) => setViewingId(p.id)}
                onDelete={deleteProject}
                t={t}
                lang={language}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-800 py-16 text-center text-sm text-secondary">
            {projects.length === 0 ? t.emptyState : t.emptyStateFiltered}
          </div>
        )}
      </div>

      {/* Create modal */}
      <AnimatePresence>
        {showCreate && (
          <ProjectModal
            key="create"
            mode="create"
            project={null}
            onClose={() => setShowCreate(false)}
            onSave={createProject}
            t={t}
          />
        )}
      </AnimatePresence>

      {/* Detail modal */}
      <AnimatePresence>
        {viewingProject && !editingProject && (
          <ProjectDetailModal
            key={`view-${viewingProject.id}`}
            project={viewingProject}
            onClose={() => setViewingId(null)}
            onEdit={startEditing}
            onDelete={deleteProject}
            onUpdateDescription={updateDescription}
            onUpdateStatus={updateStatus}
            onAddTask={addTask}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            t={t}
          />
        )}
      </AnimatePresence>

      {/* Edit meta modal */}
      <AnimatePresence>
        {editingProject && (
          <ProjectModal
            key={`edit-${editingProject.id}`}
            mode="edit"
            project={editingProject}
            onClose={() => setEditingProject(null)}
            onSave={(fields) => updateMeta(editingProject.id, fields)}
            t={t}
          />
        )}
      </AnimatePresence>
    </div>
  );
}