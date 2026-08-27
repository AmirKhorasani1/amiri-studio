import { FLAG_ORDER } from "../constants/regexConstants";

// ---------------------------------------------------------
// Class Names
// ---------------------------------------------------------

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ---------------------------------------------------------
// Regex Flags
// ---------------------------------------------------------

export function toggleFlag(flags, flagId) {
  const active = new Set(flags.split(""));

  if (active.has(flagId)) {
    active.delete(flagId);
  } else {
    active.add(flagId);
  }

  return FLAG_ORDER.filter((id) => active.has(id)).join("");
}

export function isFlagActive(flags, flagId) {
  return flags.includes(flagId);
}

// ---------------------------------------------------------
// Regex Testing
// ---------------------------------------------------------

export function testRegex(pattern, flags, value) {
  if (!pattern) {
    return {
      valid: true,
      matches: [],
      count: 0,
      error: null,
    };
  }

  try {
    const regex = new RegExp(pattern, flags);

    const globalRegex = flags.includes("g")
      ? regex
      : new RegExp(pattern, `${flags}g`);

    const matches = [...value.matchAll(globalRegex)];

    return {
      valid: true,
      matches,
      count: matches.length,
      error: null,
    };
  } catch (error) {
    return {
      valid: false,
      matches: [],
      count: 0,
      error: error.message,
    };
  }
}

// ---------------------------------------------------------
// Highlight Matches
// ---------------------------------------------------------

export function buildHighlightSegments(value, matches) {
  if (!matches || matches.length === 0) {
    return [
      {
        text: value,
        isMatch: false,
      },
    ];
  }

  const segments = [];
  let cursor = 0;

  matches.forEach((match) => {
    const start =
      match.index ?? value.indexOf(match[0], cursor);

    const end = start + match[0].length;

    if (start > cursor) {
      segments.push({
        text: value.slice(cursor, start),
        isMatch: false,
      });
    }

    if (end > start) {
      segments.push({
        text: value.slice(start, end),
        isMatch: true,
      });
    }

    cursor = Math.max(cursor, end);
  });

  if (cursor < value.length) {
    segments.push({
      text: value.slice(cursor),
      isMatch: false,
    });
  }

  return segments;
}

// ---------------------------------------------------------
// Regex Parser
// ---------------------------------------------------------

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

const SPECIAL_CHARS = new Set(
  "\\^$.*+?|(){}[]".split("")
);

export function parseRegex(pattern) {
  const tokens = [];

  let i = 0;

  while (i < pattern.length) {
    const char = pattern[i];

    // -----------------------------------------------------
    // Escape sequences
    // -----------------------------------------------------

    if (char === "\\" && i + 1 < pattern.length) {
      const next = pattern[i + 1];

      const type = ESCAPE_TYPES[next];

      tokens.push(
        type
          ? {
              token: char + next,
              type,
            }
          : {
              token: char + next,
              type: "escapedLiteral",
              value: next,
            }
      );

      i += 2;
      continue;
    }

    // -----------------------------------------------------
    // Anchors
    // -----------------------------------------------------

    if (char === "^") {
      tokens.push({
        token: "^",
        type: "start",
      });

      i += 1;
      continue;
    }

    if (char === "$") {
      tokens.push({
        token: "$",
        type: "end",
      });

      i += 1;
      continue;
    }

    // -----------------------------------------------------
    // Any character
    // -----------------------------------------------------

    if (char === ".") {
      tokens.push({
        token: ".",
        type: "any",
      });

      i += 1;
      continue;
    }

    // -----------------------------------------------------
    // Quantifiers
    // -----------------------------------------------------

    if (char === "*") {
      tokens.push({
        token: "*",
        type: "quantifierStar",
      });

      i += 1;
      continue;
    }

    if (char === "+") {
      tokens.push({
        token: "+",
        type: "quantifierPlus",
      });

      i += 1;
      continue;
    }

    if (char === "?") {
      tokens.push({
        token: "?",
        type: "quantifierOptional",
      });

      i += 1;
      continue;
    }

    // -----------------------------------------------------
    // Alternation
    // -----------------------------------------------------

    if (char === "|") {
      tokens.push({
        token: "|",
        type: "alternation",
      });

      i += 1;
      continue;
    }

    // -----------------------------------------------------
    // Groups
    // -----------------------------------------------------

    if (char === "(") {
      if (pattern.slice(i, i + 3) === "(?:") {
        tokens.push({
          token: "(?:",
          type: "nonCapGroupStart",
        });

        i += 3;
        continue;
      }

      if (pattern.slice(i, i + 3) === "(?=") {
        tokens.push({
          token: "(?=",
          type: "lookaheadStart",
        });

        i += 3;
        continue;
      }

      if (pattern.slice(i, i + 3) === "(?!") {
        tokens.push({
          token: "(?!",
          type: "negLookaheadStart",
        });

        i += 3;
        continue;
      }

      tokens.push({
        token: "(",
        type: "groupStart",
      });

      i += 1;
      continue;
    }

    if (char === ")") {
      tokens.push({
        token: ")",
        type: "groupEnd",
      });

      i += 1;
      continue;
    }

    // -----------------------------------------------------
    // Range quantifier
    // -----------------------------------------------------

    if (char === "{") {
      const close = pattern.indexOf("}", i);

      if (close !== -1) {
        const value = pattern.slice(i + 1, close);

        tokens.push({
          token: `{${value}}`,
          type: "quantifierRange",
          value,
        });

        i = close + 1;
        continue;
      }
    }

    // -----------------------------------------------------
    // Character classes
    // -----------------------------------------------------

    if (char === "[") {
      const negated = pattern[i + 1] === "^";
      const close = pattern.indexOf("]", i);

      if (close !== -1) {
        const value = pattern.slice(
          i + (negated ? 2 : 1),
          close
        );

        tokens.push({
          token: pattern.slice(i, close + 1),
          type: negated
            ? "negatedCharClass"
            : "charClass",
          value,
        });

        i = close + 1;
        continue;
      }
    }

    // -----------------------------------------------------
    // Plain literal
    // -----------------------------------------------------

    let literal = char;

    i += 1;

    while (
      i < pattern.length &&
      !SPECIAL_CHARS.has(pattern[i])
    ) {
      literal += pattern[i];
      i += 1;
    }

    tokens.push({
      token: literal,
      type: "literal",
    });
  }

  return tokens;
}

// ---------------------------------------------------------
// Quantifier Description
// ---------------------------------------------------------

export function describeQuantifierRange(
  value,
  language
) {
  const [rawMin, rawMax] = value.split(",");

  const hasComma = value.includes(",");

  if (!hasComma) {
    return language === "fa"
      ? `دقیقاً ${rawMin} بار`
      : `Exactly ${rawMin} times`;
  }

  if (rawMax === undefined || rawMax === "") {
    return language === "fa"
      ? `${rawMin} بار یا بیشتر`
      : `${rawMin} or more times`;
  }

  return language === "fa"
    ? `بین ${rawMin} تا ${rawMax} بار`
    : `${rawMin} to ${rawMax} times`;
}