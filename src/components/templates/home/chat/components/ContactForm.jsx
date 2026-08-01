import { useState } from "react";

const ContactForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    company: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.fullName.trim() || !form.phone.trim()) {
      setError("Name and phone number are required");
      return;
    }

    setError("");
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-18">
      <div>
        <h3 className="text-base font-semibold text-white">Before we start chatting</h3>
        <p className="mt-1 text-xs leading-relaxed text-neutral-400">
          Share a few quick details so I can get back to you faster
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="fullName" className="text-xs text-neutral-300">
          Full name *
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={form.fullName}
          onChange={handleChange}
          placeholder="e.g. John Smith"
          autoComplete="name"
          className="rounded-full border border-neutral-800 bg-neutral-900 px-3.5 py-3 text-sm text-white
          placeholder:text-neutral-600 outline-none transition-colors
          focus:border-white"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-xs text-neutral-300">
          Phone number *
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="+1 555 000 0000"
          autoComplete="tel"
          className="rounded-full border border-neutral-800 bg-neutral-900 px-3.5 py-3 text-sm text-white
          placeholder:text-neutral-600 outline-none transition-colors
          focus:border-white"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-xs text-neutral-300">
          Email (optional)
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
          className="rounded-full border border-neutral-800 bg-neutral-900 px-3.5 py-3 text-sm text-white
          placeholder:text-neutral-600 outline-none transition-colors
        focus:border-white"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="company" className="text-xs text-neutral-300">
          Company (optional)
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={form.company}
          onChange={handleChange}
          placeholder="Your company name"
          className="rounded-full border border-neutral-800 bg-neutral-900 px-3.5 py-3 text-sm text-white
            placeholder:text-neutral-600 outline-none transition-colors
          focus:border-white"
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-4 rounded-full bg-white py-3.5 text-sm font-medium text-black
        transition-colors hover:bg-neutral-200
        disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Starting..." : "Start chat"}
      </button>
    </form>
  );
};

export default ContactForm;