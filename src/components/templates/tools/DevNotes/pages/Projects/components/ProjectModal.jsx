import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { PROJECT_COLORS, PROJECT_ICONS } from "../utils/projectConstants";

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

export default function ProjectModal({ mode, project, onClose, onSave, t }) {
  const isEdit = mode === "edit";

  const [name, setName] = useState(project?.name ?? "");
  const [color, setColor] = useState(project?.color ?? PROJECT_COLORS[0].id);
  const [icon, setIcon] = useState(project?.icon ?? PROJECT_ICONS[0].id);

  useEffect(() => {
    setName(project?.name ?? "");
    setColor(project?.color ?? PROJECT_COLORS[0].id);
    setIcon(project?.icon ?? PROJECT_ICONS[0].id);
  }, [project]);

  const submit = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), color, icon });
  };

  return (
    <motion.div
      onClick={onClose}
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/20 backdrop-blur-[2px] p-4"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={panelVariants}
        className="w-full max-w-md rounded-lg border-primary bg-white dark:bg-neutral-950"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-primary px-5 py-3.5">
          <span className="text-sm md:text-[15.5px] font-semibold text-neutral-950 dark:text-neutral-100">
            {isEdit ? t.editProject : t.newProject}
          </span>
          <button onClick={onClose} className="dn-editor-btn text-secondary">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 px-5 py-4">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
            className="border-b-primary bg-transparent pb-3 text-base font-semibold text-neutral-950 dark:text-neutral-100 outline-none placeholder:text-neutral-600 dark:placeholder:text-neutral-300"
          />

          {/* Color picker */}
          <div>
            <p className="mb-2 text-xs font-medium text-secondary">{t.color}</p>
            <div className="flex flex-wrap items-center gap-2">
              {PROJECT_COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColor(c.id)}
                  title={c.id}
                  style={{ backgroundColor: c.hex }}
                  className={`h-6 w-6 rounded-full duration-150 hover:scale-110 ${
                    color === c.id
                      ? "ring-2 ring-black dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-neutral-950"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Icon picker */}
          <div>
            <p className="mb-2 text-xs font-medium text-secondary">{t.icon}</p>
            <div className="grid grid-cols-6 gap-2">
              {PROJECT_ICONS.map(({ id, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setIcon(id)}
                  className={`flex h-9 w-9 items-center justify-center rounded-md duration-150 ${
                    icon === id
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-400 hover:dark:bg-neutral-700"
                  }`}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 border-t-primary px-4 py-3">
          <button onClick={onClose} className="btn-secondary">
            {t.cancel}
          </button>
          <button
            onClick={submit}
            disabled={!name.trim()}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isEdit ? t.save : t.create}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}