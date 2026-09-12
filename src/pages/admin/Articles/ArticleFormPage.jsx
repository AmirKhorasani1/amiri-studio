import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createArticle, updateArticle, getArticleByIdAdmin } from "@api/articleApi";
import { getMediaUrl } from "@lib/getMediaUrl";

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  category: "",
  tags: "",
  status: "draft",
};

const ArticleFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;

    getArticleByIdAdmin(id)
      .then((res) => {
        const a = res.data.data;
        setForm({
          title: a.title,
          excerpt: a.excerpt,
          content: a.content,
          category: a.category || "",
          tags: (a.tags || []).join(", "),
          status: a.status,
        });
        setCoverPreview(getMediaUrl(a.cover));
      })
      .catch(() => setError("خطا در دریافت اطلاعات مقاله"))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isEdit && !coverFile) {
      setError("انتخاب تصویر کاور الزامی است");
      return;
    }

    setSaving(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("excerpt", form.excerpt);
    formData.append("content", form.content);
    formData.append("category", form.category);
    formData.append("tags", form.tags);
    formData.append("status", form.status);
    if (coverFile) formData.append("cover", coverFile);

    try {
      if (isEdit) {
        await updateArticle(id, formData);
      } else {
        await createArticle(formData);
      }
      navigate("/dashboard/articles");
    } catch (err) {
      setError(err.response?.data?.error || "خطا در ذخیره‌ی مقاله");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6 text-sm text-neutral-500">در حال بارگذاری...</p>;

  return (
    <div dir="rtl" className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-xl font-bold text-white">
        {isEdit ? "ویرایش مقاله" : "مقاله‌ی جدید"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm text-neutral-400">عنوان</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-white outline-none focus:border-neutral-600"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-neutral-400">توضیح کوتاه</label>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            required
            rows={2}
            maxLength={300}
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-white outline-none focus:border-neutral-600"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-neutral-400">محتوا (Markdown)</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            rows={14}
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 font-mono text-sm text-white outline-none focus:border-neutral-600"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-neutral-400">تصویر کاور</label>

          {coverPreview && (
            <img
              src={coverPreview}
              alt="پیش‌نمایش کاور"
              className="mb-3 h-40 w-full rounded-xl border border-neutral-800 object-cover"
            />
          )}

          <input
            type="file"
            accept="image/png, image/jpeg, image/webp, image/gif"
            onChange={handleCoverChange}
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-300 file:ml-3 file:rounded-lg file:border-0 file:bg-neutral-800 file:px-3 file:py-1.5 file:text-neutral-200"
          />
          <p className="mt-1 text-xs text-neutral-500">حداکثر حجم ۵ مگابایت — jpg, png, webp, gif</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm text-neutral-400">دسته‌بندی</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-white outline-none focus:border-neutral-600"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-neutral-400">وضعیت</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-white outline-none focus:border-neutral-600"
            >
              <option value="draft">پیش‌نویس</option>
              <option value="published">منتشر شده</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm text-neutral-400">برچسب‌ها (با کاما جدا کنید)</label>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="react, frontend, جاوااسکریپت"
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-white outline-none focus:border-neutral-600"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="mt-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-neutral-950 hover:bg-neutral-200 disabled:opacity-50"
        >
          {saving ? "در حال ذخیره..." : "ذخیره‌ی مقاله"}
        </button>
      </form>
    </div>
  );
};

export default ArticleFormPage;