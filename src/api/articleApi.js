import api from "./conversationApi";

// عمومی
export const getPublishedArticles = (params = {}) => api.get("/articles", { params });
export const getArticleBySlug = (slug) => api.get(`/articles/${slug}`);

// ادمین
export const getAllArticlesAdmin = () => api.get("/articles/admin/all");
export const getArticleByIdAdmin = (id) => api.get(`/articles/admin/${id}`);

export const createArticle = (formData) =>
  api.post("/articles", formData, { headers: { "Content-Type": undefined } });

export const updateArticle = (id, formData) =>
  api.put(`/articles/${id}`, formData, { headers: { "Content-Type": undefined } });

export const deleteArticle = (id) => api.delete(`/articles/${id}`);