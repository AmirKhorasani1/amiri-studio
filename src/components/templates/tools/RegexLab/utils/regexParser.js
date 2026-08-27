// A small, intentionally forgiving tokenizer — it does not build a full
// regex AST, it just walks the pattern once and labels each piece well
// enough to explain it to a human. Unknown sequences fall back to
// "literal" instead of throwing, so a partially-typed pattern never
// breaks the breakdown panel.
const ESCAPE_TYPES = {
  d: "digit",
  D: "nonDigit",
  w: "word",
  W: "nonWord",
  s: "whitespace",
  S: "nonWhitespace",
  b: "wordBoundary",
  B: "nonWordBoundary",
  n: "newline",
  t: "tab",
  r: "carriageReturn",
};

const SPECIAL_CHARS = new Set("\\^$.*+?|(){}[]".split(""));

export function parseRegex(pattern) {
  const tokens = [];
  let i = 0;

  while (i < pattern.length) {
    const char = pattern[i];

    // Escape sequences: \d, \w, \n, or an escaped literal like \.
    if (char === "\\" && i + 1 < pattern.length) {
      const next = pattern[i + 1];
      const type = ESCAPE_TYPES[next];
      tokens.push(
        type
          ? { token: char + next, type }
          : { token: char + next, type: "escapedLiteral", value: next }
      );
      i += 2;
      continue;
    }

    if (char === "^") {
      tokens.push({ token: "^", type: "start" });
      i += 1;
      continue;
    }

    if (char === "$") {
      tokens.push({ token: "$", type: "end" });
      i += 1;
      continue;
    }

    if (char === ".") {
      tokens.push({ token: ".", type: "any" });
      i += 1;
      continue;
    }

    if (char === "*") {
      tokens.push({ token: "*", type: "quantifierStar" });
      i += 1;
      continue;
    }

    if (char === "+") {
      tokens.push({ token: "+", type: "quantifierPlus" });
      i += 1;
      continue;
    }

    if (char === "?") {
      tokens.push({ token: "?", type: "quantifierOptional" });
      i += 1;
      continue;
    }

    if (char === "|") {
      tokens.push({ token: "|", type: "alternation" });
      i += 1;
      continue;
    }

    if (char === "(") {
      if (pattern.slice(i, i + 3) === "(?:") {
        tokens.push({ token: "(?:", type: "nonCapGroupStart" });
        i += 3;
        continue;
      }
      if (pattern.slice(i, i + 3) === "(?=") {
        tokens.push({ token: "(?=", type: "lookaheadStart" });
        i += 3;
        continue;
      }
      if (pattern.slice(i, i + 3) === "(?!") {
        tokens.push({ token: "(?!", type: "negLookaheadStart" });
        i += 3;
        continue;
      }
      tokens.push({ token: "(", type: "groupStart" });
      i += 1;
      continue;
    }

    if (char === ")") {
      tokens.push({ token: ")", type: "groupEnd" });
      i += 1;
      continue;
    }

    if (char === "{") {
      const close = pattern.indexOf("}", i);
      if (close !== -1) {
        const value = pattern.slice(i + 1, close);
        tokens.push({ token: `{${value}}`, type: "quantifierRange", value });
        i = close + 1;
        continue;
      }
    }

    if (char === "[") {
      const negated = pattern[i + 1] === "^";
      const close = pattern.indexOf("]", i);
      if (close !== -1) {
        const value = pattern.slice(i + (negated ? 2 : 1), close);
        tokens.push({
          token: pattern.slice(i, close + 1),
          type: negated ? "negatedCharClass" : "charClass",
          value,
        });
        i = close + 1;
        continue;
      }
    }

    // Plain literal run — gobble consecutive non-special characters so
    // "hello" is one breakdown row instead of five.
    let literal = char;
    i += 1;
    while (i < pattern.length && !SPECIAL_CHARS.has(pattern[i])) {
      literal += pattern[i];
      i += 1;
    }
    tokens.push({ token: literal, type: "literal" });
  }

  return tokens;
}

// Turns a {n}, {n,}, or {n,m} quantifier body into a readable phrase.
export function describeQuantifierRange(value, language) {
  const [rawMin, rawMax] = value.split(",");
  const hasComma = value.includes(",");

  if (!hasComma) {
    return language === "fa"
      ? `دقیقاً ${rawMin} بار`
      : `Exactly ${rawMin} times`;
  }

  if (rawMax === undefined || rawMax === "") {
    return language === "fa" ? `${rawMin} بار یا بیشتر` : `${rawMin} or more times`;
  }

  return language === "fa"
    ? `بین ${rawMin} تا ${rawMax} بار`
    : `${rawMin} to ${rawMax} times`;
}