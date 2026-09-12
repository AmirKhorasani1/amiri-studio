import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiPlus, HiPencil, HiTrash, HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { getAllArticlesAdmin, updateArticle, deleteArticle } from "@api/articleApi";

const ArticlesManagePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadArticles = () => {
    setLoading(true);
    getAllArticlesAdmin()
      .then((res) => setArticles(res.data.data))
      .catch((err) => console.error("Failed to load articles:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleToggleStatus = async (article) => {
    const nextStatus = article.status === "published" ? "draft" : "published";
    try {
      await updateArticle(article._id, { status: nextStatus });
      loadArticles();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("آیا از حذف این مقاله مطمئن هستید؟")) return;
    try {
      await deleteArticle(id);
      loadArticles();
    } catch (err) {
      console.error("Failed to delete article:", err);
    }
  };

  return (
    <div dir="rtl" className="flex h-full flex-col">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">مدیریت مقالات</h1>
        <Link
          to="/dashboard/articles/new"
          className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-neutral-200"
        >
          <HiPlus size={18} />
          مقاله جدید
        </Link>
      </div>

      <div className="flex-1 overflow-auto rounded-2xl border border-neutral-800">
        {loading ? (
          <p className="p-6 text-sm text-neutral-500">در حال بارگذاری...</p>
        ) : articles.length === 0 ? (
          <p className="p-6 text-sm text-neutral-500">هنوز مقاله‌ای ثبت نشده است.</p>
        ) : (
          <table className="w-full text-right text-sm">
            <thead className="border-b border-neutral-800 text-neutral-400">
              <tr>
                <th className="px-4 py-3 font-medium">عنوان</th>
                <th className="px-4 py-3 font-medium">دسته‌بندی</th>
                <th className="px-4 py-3 font-medium">وضعیت</th>
                <th className="px-4 py-3 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article._id} className="border-b border-neutral-900">
                  <td className="px-4 py-3 text-white">{article.title}</td>
                  <td className="px-4 py-3 text-neutral-400">{article.category || "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        article.status === "published"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-neutral-800 text-neutral-400"
                      }`}
                    >
                      {article.status === "published" ? "منتشر شده" : "پیش‌نویس"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(article)}
                        title={article.status === "published" ? "تبدیل به پیش‌نویس" : "انتشار"}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-900"
                      >
                        {article.status === "published" ? (
                          <HiOutlineEyeSlash size={16} />
                        ) : (
                          <HiOutlineEye size={16} />
                        )}
                      </button>

                      <Link
                        to={`/dashboard/articles/${article._id}/edit`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-900"
                      >
                        <HiPencil size={16} />
                      </Link>

                      <button
                        onClick={() => handleDelete(article._id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-red-500/10 hover:text-red-400"
                      >
                        <HiTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ArticlesManagePage;