import {
  Folder,
  Briefcase,
  Rocket,
  Code2,
  Palette,
  BookOpen,
  Heart,
  ShoppingBag,
  Music2,
  Camera,
  Coffee,
  GraduationCap,
} from "lucide-react";

// همون ۱۰ رنگی که برای dn-note-color-* در globals.css تعریف شده
export const PROJECT_COLORS = [
  { id: "red", hex: "#ef4444" },
  { id: "orange", hex: "#f97316" },
  { id: "amber", hex: "#f59e0b" },
  { id: "yellow", hex: "#eab308" },
  { id: "green", hex: "#22c55e" },
  { id: "teal", hex: "#14b8a6" },
  { id: "blue", hex: "#3b82f6" },
  { id: "indigo", hex: "#6366f1" },
  { id: "purple", hex: "#a855f7" },
  { id: "pink", hex: "#ec4899" },
];

export const PROJECT_ICONS = [
  { id: "folder", Icon: Folder },
  { id: "briefcase", Icon: Briefcase },
  { id: "rocket", Icon: Rocket },
  { id: "code", Icon: Code2 },
  { id: "palette", Icon: Palette },
  { id: "book", Icon: BookOpen },
  { id: "heart", Icon: Heart },
  { id: "bag", Icon: ShoppingBag },
  { id: "music", Icon: Music2 },
  { id: "camera", Icon: Camera },
  { id: "coffee", Icon: Coffee },
  { id: "grad", Icon: GraduationCap },
];

// وضعیت پروژه — flow پیشنهادی: planning -> active -> completed -> archived
// ولی کاربر می‌تونه دستی هم بین اینا جابجا بشه
export const PROJECT_STATUSES = [
  { id: "planning", hex: "#a3a3a3" },
  { id: "active", hex: "#22c55e" },
  { id: "completed", hex: "#3b82f6" },
  { id: "archived", hex: "#737373" },
];

// حالت‌های Sort لیست پروژه‌ها
export const PROJECT_SORTS = ["updated", "created", "name"];