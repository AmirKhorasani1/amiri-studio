const validateEnvironment = () => {
  const port = process.env.PORT || "5000";

  if (!/^\d+$/.test(port) || Number(port) < 1 || Number(port) > 65535) {
    throw new Error("Invalid PORT in server/.env. Use PORT=5000 without a trailing backslash.");
  }

  const mongoUri = process.env.MONGODB_URI || "";
  if (!/^mongodb(?:\+srv)?:\/\//.test(mongoUri) || mongoUri.includes("\\")) {
    throw new Error("Invalid MONGODB_URI in server/.env. Use mongodb://... on one line without backslashes.");
  }

  const origins = (process.env.CLIENT_URLS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  for (const origin of origins) {
    let parsed;
    try {
      parsed = new URL(origin);
    } catch {
      throw new Error(`Invalid CLIENT_URLS entry: ${origin}. Use http://localhost:5173 without backslashes.`);
    }

    if (!["http:", "https:"].includes(parsed.protocol) || parsed.origin !== origin) {
      throw new Error(`Invalid CLIENT_URLS entry: ${origin}. Each value must be an origin without a path or backslash.`);
    }
  }

  if (process.env.GROQ_API_KEY?.includes("\\")) {
    throw new Error("Invalid GROQ_API_KEY format. Remove trailing backslashes and keep the value on one line.");
  }
};

module.exports = validateEnvironment;
