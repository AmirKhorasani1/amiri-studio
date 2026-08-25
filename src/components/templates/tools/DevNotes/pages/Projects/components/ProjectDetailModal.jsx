import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Pencil, Trash2, Plus, Circle, CheckCircle2, Archive, ArchiveRestore } from "lucide-react";
import { PROJECT_COLORS, PROJECT_ICONS, PROJECT_STATUSES } from "../utils/projectConstants";
import { formatDateTime } from "../utils/projectStorage";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.12, ease: "easeIn" } },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.80, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 6,
    transition: { duration: 0.35, ease: "easeIn" },
  },
};

export default function ProjectDetailModal({
  project,
  onClose,
  onEdit,
  onDelete,
  onUpdateDescription,
  onUpdateStatus,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  t,
}) {
  const [newTask, setNewTask] = useState("");

  const colorMeta = PROJECT_COLORS.find((c) => c.id === project.color);
  const iconMeta = PROJECT_ICONS.find((i) => i.id === project.icon) ?? PROJECT_ICONS[0];
  const statusMeta =
    PROJECT_STATUSES.find((s) => s.id === project.status) ?? PROJECT_STATUSES[1];
  const Icon = iconMeta.Icon;
  const accent = colorMeta?.hex ?? "#a3a3a3";
  const techStack = project.techStack ?? [];
  const isArchived = project.status === "archived";

  const submitTask = () => {
    if (!newTask.trim()) return;
    onAddTask(project.id, newTask.trim());
    setNewTask("");
  };

  const done = project.tasks.filter((task) => task.done).length;

  return (
    <motion.div
      onClick={onClose}
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-black/15 backdrop-blur-[2px] md:p-3"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={panelVariants}
        className="w-full h-full md:h-fit max-w-2xl md:rounded-lg md:border-primary bg-white dark:bg-black"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 md:border-b-primary py-5 px-3.5 md:p-3.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              className="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: `${accent}22`, color: accent }}
            >
              <Icon size={20} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm md:text-[15.5px] font-semibold text-neutral-950 dark:text-neutral-100">
                {project.name}
              </p>
              <p className="text-xs text-secondary mt-1.5">
                {done}/{project.tasks.length} {t.tasksLabel}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1 bg-neutral-700/70 rounded-full px-2 py-1">
            <button
              onClick={() => onDelete(project)}
              className="dn-editor-btn text-secondary hover:text-red-400"
              title={t.delete}
            >
              <Trash2 size={21} />
            </button>
            <button onClick={onClose} className="dn-editor-btn text-secondary">
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="max-h-[65vh] overflow-y-auto px-5 md:py-4">
          {/* Status switcher */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {PROJECT_STATUSES.map((s) => (
              <button
                key={s.id}
                onClick={() => onUpdateStatus(project.id, s.id)}
                className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium duration-150 ${
                  project.status === s.id
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-400 hover:dark:bg-neutral-700"
                }`}
              >
                {t.statusLabels[s.id]}
              </button>
            ))}
          </div>

          {/* Tech stack 
          {techStack.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-neutral-200 dark:bg-neutral-800 px-2.5 py-2 text-xs text-neutral-700 dark:text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
          */}

          {/* Description */}
          <textarea
            value={project.description ?? ""}
            onChange={(e) => onUpdateDescription(project.id, e.target.value)}
            placeholder={t.descriptionPlaceholder}
            rows={3}
            className="w-full resize-none rounded-md bg-neutral-100 dark:bg-neutral-900 px-3 py-2.5 text-sm leading-relaxed text-neutral-950 dark:text-neutral-200 outline-none placeholder:text-neutral-600 dark:placeholder:text-neutral-400"
          />

          {/* Add task */}
          <div className="mt-4 md:flex items-center gap-2 hidden">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitTask()}
              placeholder={t.taskPlaceholder}
              className="min-w-0 flex-1 rounded-full bg-neutral-100 dark:bg-neutral-900 px-4 py-2.5 text-sm outline-none placeholder:text-neutral-600 dark:placeholder:text-neutral-400"
            />
            <button
              onClick={submitTask}
              disabled={!newTask.trim()}
              className="dn-btn-new disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus size={16} />
              {t.newTask}
            </button>
          </div>

          {/* Add task mobile*/}
          <div className="fixed bottom-5 right-0 left-0 px-5 flex items-center gap-2.5 md:hidden">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitTask()}
              placeholder={t.taskPlaceholder}
              className="min-w-0 flex-1 rounded-full bg-neutral-100 dark:bg-neutral-700/70 px-4 py-3 md:py-2.5 text-sm outline-none placeholder:text-neutral-600 dark:placeholder:text-neutral-400"
            />
            <button
              onClick={submitTask}
              disabled={!newTask.trim()}
              className="absolute left-5 dn-btn-new disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Plus size={16} />
              {t.newTask}
            </button>
          </div>

          {/* Task list */}
          <div className="mt-3 flex flex-col gap-1">
            {project.tasks.length === 0 ? (
              <p className="py-6 text-center text-sm text-secondary">{t.noTasks}</p>
            ) : (
              project.tasks.map((task) => (
                <div
                  key={task.id}
                  className="group/task flex items-center gap-2.5 rounded-md px-2 py-2 duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                >
                  <button
                    onClick={() => onToggleTask(project.id, task.id)}
                    className="shrink-0"
                    style={{ color: task.done ? accent : undefined }}
                  >
                    {task.done ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <Circle size={18} className="text-neutral-400 dark:text-neutral-600" />
                    )}
                  </button>
                  <span
                    className={`min-w-0 flex-1 truncate text-sm ${
                      task.done
                        ? "text-secondary line-through"
                        : "text-neutral-950 dark:text-neutral-200"
                    }`}
                  >
                    {task.text}
                  </span>
                  <button
                    onClick={() => onDeleteTask(project.id, task.id)}
                    className="dn-editor-btn shrink-0 text-secondary opacity-0 hover:text-red-400 group-hover/task:opacity-100"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between md:border-t-primary px-4 py-3">
          <span className="text-xs text-secondary">
            {t.created} {formatDateTime(project.createdAt)}
          </span>
          <button onClick={() => onEdit(project)} className="btn-primary flex items-center gap-1.5">
            <Pencil size={14} />
            {t.edit}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}