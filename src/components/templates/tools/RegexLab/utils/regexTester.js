// The heart of the tool. Wrapped in try/catch so a half-typed pattern
// (like an unclosed bracket) can never crash the UI — it just reports
// itself as invalid.
export function testRegex(pattern, flags, value) {
  if (!pattern) {
    return { valid: true, matches: [], count: 0, error: null };
  }

  try {
    const regex = new RegExp(pattern, flags);
    const globalRegex = flags.includes("g")
      ? regex
      : new RegExp(pattern, flags + "g");

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