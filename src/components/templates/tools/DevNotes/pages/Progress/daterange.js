export const RANGE_DAYS = { "7d": 7, "30d": 30, "90d": 90, all: null };

// بازه‌ی انتخابی رو به یه تاریخ "از اینجا به بعد" تبدیل می‌کنه؛ برای All Time چیزی رو فیلتر نمی‌کنیم
export function rangeCutoff(range) {
  const days = RANGE_DAYS[range];
  if (days == null) return null;
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - (days - 1));
  return d;
}

export function isWithinRange(iso, cutoff) {
  if (!iso) return false;
  if (!cutoff) return true;
  return new Date(iso) >= cutoff;
}

export function dateKey(iso) {
  if (!iso) return null;
  return new Date(iso).toISOString().slice(0, 10);
}

export function daysBetween(start, end) {
  const list = [];
  const cur = new Date(start);
  const last = new Date(end);
  cur.setHours(0, 0, 0, 0);
  last.setHours(0, 0, 0, 0);
  while (cur <= last) {
    list.push(new Date(cur).toISOString().slice(0, 10));
    cur.setDate(cur.getDate() + 1);
  }
  return list;
}