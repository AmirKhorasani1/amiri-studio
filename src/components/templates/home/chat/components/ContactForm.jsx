import { useState } from "react";
import { useLanguage } from "@context/LanguageContext";

const translations = {
  en: {
    heading: "Before we start chatting",
    description: "Share a few quick details so I can get back to you faster",
    fullName: "Full name *",
    fullNamePlaceholder: "e.g. John Smith",
    phone: "Phone number *",
    phonePlaceholder: "09139634709",
    email: "Email (optional)",
    emailPlaceholder: "you@example.com",
    company: "Company (optional)",
    companyPlaceholder: "Your company name",
    errors: {
      fullNameRequired: "Please enter your full name",
      phoneRequired: "Please enter your phone number",
      phoneInvalid: "Enter a valid mobile number starting with 09 (11 digits)",
      emailInvalid: "Enter a valid email address",
    },
    submit: "Start chat",
    submitting: "Starting...",
  },
  fa: {
    heading: "قبل از شروع گفتگو",
    description: "چند اطلاعات کوتاه بگذارید تا سریع‌تر بتوانم باهاتون در ارتباط باشم",
    fullName: "نام و نام‌خانوادگی *",
    fullNamePlaceholder: "مثلاً علی محمدی",
    phone: "شماره تماس *",
    phonePlaceholder: "09139634709",
    email: "ایمیل (اختیاری)",
    emailPlaceholder: "you@example.com",
    company: "شرکت (اختیاری)",
    companyPlaceholder: "نام شرکت شما",
    errors: {
      fullNameRequired: "لطفاً نام و نام‌خانوادگی خود را وارد کنید",
      phoneRequired: "لطفاً شماره موبایل خود را وارد کنید",
      phoneInvalid: "شماره موبایل باید با 09 شروع شود و ۱۱ رقم باشد",
      emailInvalid: "ایمیل واردشده معتبر نیست",
    },
    submit: "شروع گفتگو",
    submitting: "در حال شروع...",
  },
};

// Iranian mobile: starts with 09, exactly 11 digits, digits only
const PHONE_REGEX = /^09\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm = ({ onSubmit, loading }) => {
  const { language } = useLanguage();
  const t = translations[language] ?? translations.en;
  const isRTL = language === "fa";

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    company: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = t.errors.fullNameRequired;
    }

    const phone = form.phone.trim();
    if (!phone) {
      nextErrors.phone = t.errors.phoneRequired;
    } else if (!PHONE_REGEX.test(phone)) {
      nextErrors.phone = t.errors.phoneInvalid;
    }

    if (form.email.trim() && !EMAIL_REGEX.test(form.email.trim())) {
      nextErrors.email = t.errors.emailInvalid;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  const inputClass = (field) =>
    `rounded-full bg-neutral-800/80 p-3.5 text-sm text-white placeholder:text-neutral-600 outline-none
     transition-colors focus:border-white border ${
       errors[field] ? "border-rose-500" : "border-transparent"
     }`;

  return (
    <form dir={isRTL ? "rtl" : "ltr"} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5.5 pt-18">
      <div>
        <h3 className="text-base font-semibold text-white">{t.heading}</h3>
        <p className="mt-1 text-[13px] leading-relaxed text-neutral-400">{t.description}</p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="fullName" className="text-xs md:text-[13px] text-neutral-300">
          {t.fullName}
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={form.fullName}
          onChange={handleChange}
          placeholder={t.fullNamePlaceholder}
          autoComplete="name"
          aria-invalid={!!errors.fullName}
          className={inputClass("fullName")}
        />
        {errors.fullName && <p className="text-xs text-rose-500">{errors.fullName}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-xs md:text-[13px] text-neutral-300">
          {t.phone}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          value={form.phone}
          onChange={handleChange}
          placeholder={t.phonePlaceholder}
          autoComplete="tel"
          maxLength={11}
          aria-invalid={!!errors.phone}
          className={inputClass("phone")}
        />
        {errors.phone && <p className="text-xs text-rose-500">{errors.phone}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-xs md:text-[13px] text-neutral-300">
          {t.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder={t.emailPlaceholder}
          autoComplete="email"
          aria-invalid={!!errors.email}
          className={inputClass("email")}
        />
        {errors.email && <p className="text-xs text-rose-500">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="company" className="text-xs md:text-[13px] text-neutral-300">
          {t.company}
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={form.company}
          onChange={handleChange}
          placeholder={t.companyPlaceholder}
          className={inputClass("company")}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 rounded-full bg-white py-3.5 text-sm font-medium text-black
        transition-colors hover:bg-neutral-200
        disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? t.submitting : t.submit}
      </button>
    </form>
  );
};

export default ContactForm;