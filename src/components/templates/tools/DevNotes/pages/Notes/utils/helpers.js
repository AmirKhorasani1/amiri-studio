export const uid = () => Math.random().toString(36).slice(2, 10);

export const nowISO = () => new Date().toISOString();

export function formatDateTime(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function truncate(text, max = 140) {
  if (!text) return "";
  const clean = text.trim();
  return clean.length > max ? `${clean.slice(0, max).trimEnd()}…` : clean;
}

/* ----------------------------------------------------------------------
 * Lightweight markdown toolbar helper.
 * Wraps/prefixes the current selection inside a <textarea> so the editor
 * toolbar (Bold, Italic, Heading, Bullet, Number, Code, Quote, Link) can
 * work without pulling in a full rich-text-editor dependency.
 * -------------------------------------------------------------------- */
export function applyMarkdown(textarea, type) {
  const { value, selectionStart, selectionEnd } = textarea;
  const selected = value.slice(selectionStart, selectionEnd);

  const wrap = (before, after = before, placeholder = "text") => {
    const text = selected || placeholder;
    const next =
      value.slice(0, selectionStart) +
      before +
      text +
      after +
      value.slice(selectionEnd);
    const cursorStart = selectionStart + before.length;
    const cursorEnd = cursorStart + text.length;
    return { value: next, selectionStart: cursorStart, selectionEnd: cursorEnd };
  };

  const prefixLines = (prefix, numbered = false) => {
    const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
    let lineEnd = value.indexOf("\n", selectionEnd);
    if (lineEnd === -1) lineEnd = value.length;

    const block = value.slice(lineStart, lineEnd);
    const lines = block.split("\n");

    const numberedRe = /^\d+\.\s/;
    const isPrefixed = (line) =>
      numbered ? numberedRe.test(line) : line.startsWith(prefix);

    // Toggle off if every non-empty line already has the prefix.
    const nonEmpty = lines.filter((l) => l.trim().length > 0);
    const allPrefixed = nonEmpty.length > 0 && nonEmpty.every(isPrefixed);

    let n = 0;
    const nextLines = lines.map((line) => {
      if (allPrefixed) {
        return numbered ? line.replace(numberedRe, "") : line.slice(prefix.length);
      }
      if (isPrefixed(line)) return line;
      n += 1;
      return numbered ? `${n}. ${line}` : `${prefix}${line}`;
    });

    const prefixed = nextLines.join("\n");
    const next = value.slice(0, lineStart) + prefixed + value.slice(lineEnd);
    return {
      value: next,
      selectionStart: lineStart,
      selectionEnd: lineStart + prefixed.length,
    };
  };

  switch (type) {
    case "bold":
      return wrap("**", "**", "bold text");
    case "italic":
      return wrap("*", "*", "italic text");
    case "code":
      return wrap("`", "`", "code");
    case "heading":
      return prefixLines("## ");
    case "quote":
      return prefixLines("> ");
    case "bullet":
      return prefixLines("- ");
    case "number":
      return prefixLines("", true);
    case "link": {
      const text = selected || "link text";
      const before = "[";
      const after = "](https://)";
      const next =
        value.slice(0, selectionStart) +
        before +
        text +
        after +
        value.slice(selectionEnd);
      const urlStart = selectionStart + before.length + text.length + 2;
      const urlEnd = urlStart + "https://".length;
      return { value: next, selectionStart: urlStart, selectionEnd: urlEnd };
    }
    default:
      return { value, selectionStart, selectionEnd };
  }
}