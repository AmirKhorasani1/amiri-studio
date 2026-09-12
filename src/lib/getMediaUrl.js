const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(
  /\/api\/?$/,
  ""
);

export const getMediaUrl = (filePath) => {
  if (!filePath) return "";
  if (filePath.startsWith("http")) return filePath;
  return `${API_BASE}${filePath}`;
};