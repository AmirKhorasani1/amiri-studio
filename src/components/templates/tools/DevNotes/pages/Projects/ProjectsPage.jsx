import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useLanguage } from "@context/LanguageContext";
import { uid, nowISO, loadProjects, saveProjects } from "./utils/projectStorage";
import { PROJECT_COLORS } from "./utils/projectConstants";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import ProjectDetailModal from "./components/ProjectDetailModal";

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
  },
};

export default function ProjectsPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const dir = language === "fa" ? "rtl" : "ltr";

  const [projects, setProjects] = useState(loadProjects);
  const [search, setSearch] = useState("");
  const [colorFilter, setColorFilter] = useState(null);
  const [viewingId, setViewingId] = useState(null);
  const [editingProject, setEditingProject] = useState(null); // meta edit
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  const createProject = useCallback((fields) => {
    const project = {
      id: uid(),
      name: fields.name,
      color: fields.color,
      icon: fields.icon,
      description: "",
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
              tasks: [...p.tasks, { id: uid(), text, done: false, createdAt: nowISO() }],
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
                task.id === taskId ? { ...task, done: !task.done } : task
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

    if (colorFilter) {
      list = list.filter((p) => p.color === colorFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q)
      );
    }

    return [...list].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }, [projects, search, colorFilter]);

  const viewingProject = projects.find((p) => p.id === viewingId) ?? null;

  return (
    <div dir={dir} className="min-h-screen w-full text-black dark:text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-25">
        {/* Header */}
        <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">{t.pageTitle}</h1>
            <p className="mt-1.5 text-sm text-secondary">
              {projects.length} {t.projectsCount}
            </p>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="dn-search-wrap">
              <Search size={15} className="shrink-0 text-neutral-600 dark:text-neutral-300" />
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
        </div>

        {/* Color filter */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setColorFilter(null)}
            className={`dn-tab ${colorFilter === null ? "dn-tab-active" : "dn-tab-inactive"}`}
          >
            {t.all}
          </button>
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