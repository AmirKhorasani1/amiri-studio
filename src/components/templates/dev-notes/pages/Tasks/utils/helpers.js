export const uid = () => Math.random().toString(36).slice(2, 10);

export const todayISO = () => new Date().toISOString().slice(0, 10);

export function addDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function formatDate(iso) {
  if (!iso) return null;
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function relativeDayLabel(iso) {
  if (!iso) return null;
  if (iso === todayISO()) return "Today";
  if (iso === addDays(1)) return "Tomorrow";
  return formatDate(iso);
}

export function isThisWeek(iso) {
  const target = new Date(iso + "T00:00:00");
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + (7 - start.getDay()));
  return target > new Date(addDays(1) + "T00:00:00") && target <= end;
}

export function makeChecklist(items) {
  return items.map((text) => ({ id: uid(), text, checked: false }));
}