import { FileText, MessageSquare, Sparkles, Bug } from "lucide-react";

export const STATUS_STYLES = {
  todo: { label: "Not started", bg: "bg-neutral-700", text: "text-neutral-50", dot: "#a3a3a3" },
  "in-progress": { label: "In progress", bg: "bg-sky-700", text: "text-white", dot: "#5b8cff" },
  completed: { label: "Done", bg: "bg-emerald-700", text: "text-emerald-50", dot: "#34d399" },
};

export const PRIORITY_STYLES = {
  high: { label: "High", bg: "bg-rose-500/90", text: "text-white" },
  medium: { label: "Medium", bg: "bg-amber-600/90", text: "text-white" },
  low: { label: "Low", bg: "bg-emerald-700/80", text: "text-white" },
  none: { label: "None", bg: "bg-neutral-700/60", text: "text-neutral-300" },
};

export const TYPE_STYLES = {
  polish: { label: "Polish", bg: "bg-fuchsia-800/70", text: "text-fuchsia-200" },
  feature: { label: "Feature request", bg: "bg-teal-800/60", text: "text-teal-200" },
  bug: { label: "Bug", bg: "bg-red-800/60", text: "text-red-200" },
};

export const TYPE_ICONS = {
  polish: Sparkles,
  feature: MessageSquare,
  bug: Bug,
};

export const DEFAULT_TYPE_ICON = FileText;