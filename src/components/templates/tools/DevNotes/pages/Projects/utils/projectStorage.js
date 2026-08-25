const STORAGE_KEY = "dn-projects-v1";

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function nowISO() {
  return new Date().toISOString();
}

// پروژه‌های قدیمی (قبل از اضافه شدن status/techStack) رو با مقدار پیش‌فرض پر می‌کنیم
// تا کرش نکنه و بقیه UI بتونه بی‌دغدغه بهشون تکیه کنه
function normalizeProject(p) {
  return {
    status: "active",
    techStack: [],
    ...p,
  };
}

export function loadProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(normalizeProject) : [];
  } catch {
    return [];
  }
}

export function saveProjects(projects) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch {
    /* quota یا خطای serialize رو نادیده می‌گیریم */
  }
}

export function formatDateTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// برای فوتر Card: "2h ago" / "۲ ساعت پیش"
export function formatRelativeTime(iso, lang = "en") {
  if (!iso) return "";
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (lang === "fa") {
    if (minutes < 1) return "همین الان";
    if (minutes < 60) return `${minutes} دقیقه پیش`;
    if (hours < 24) return `${hours} ساعت پیش`;
    if (days < 30) return `${days} روز پیش`;
    return formatDateTime(iso);
  }

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;
  return formatDateTime(iso);
}