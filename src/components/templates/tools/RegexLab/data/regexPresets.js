// Each preset is self-contained: adding a new tool to Regex Lab later is
// just pushing one more object into this array.
export const REGEX_PRESETS = [
  {
    id: "iranian-mobile",
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBmaWxsPSJub25lIiAgICAgZD0ibTQuOTEyIDEwLjU0MWwyLjY0LTIuNjRhMi4wOCAyLjA4IDAgMCAwIC41MDctMi4wNjRhMjcgMjcgMCAwIDEtLjQ5LTEuODQ0QzcuNDUzIDMuNDUgNi45NzYgMyA2LjQyIDNINC45MTJjLTEuMTEgMC0yLjAyMy45MDQtMS45MDEgMi4wMDhjLjkyNiA4LjM5MiA3LjU5IDE1LjA1NSAxNS45ODEgMTUuOTgxYzEuMTA0LjEyMiAyLjAwOC0uNzkgMi4wMDgtMS45di0xLjUxYzAtLjU1NC0uNDUyLTEuMDEtLjk5OC0xLjExYTE1IDE1IDAgMCAxLTEuNzc0LS40NTljLS43NjctLjI0NC0xLjYxOS0uMDcyLTIuMTg4LjQ5NmwtMi41ODEgMi41ODIiLz48L3N2Zz4=",
    name: { en: "Iranian Mobile", fa: "موبایل ایران" },
    description: {
      en: "Validates Iranian mobile numbers",
      fa: "شماره موبایل ایرانی را اعتبارسنجی می‌کند",
    },
    pattern: "^09\\d{9}$",
    flags: "",
    examples: [
      { value: "09121234567", valid: true },
      { value: "0912345678", valid: false },
    ],
  },
  {
    id: "email",
    icon: "📧",
    name: { en: "Email", fa: "ایمیل" },
    description: {
      en: "Validates common email addresses",
      fa: "آدرس‌های ایمیل رایج را اعتبارسنجی می‌کند",
    },
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    flags: "i",
    examples: [
      { value: "amir@gmail.com", valid: true },
      { value: "amir@@gmail", valid: false },
    ],
  },
  {
    id: "url",
    icon: "🌐",
    name: { en: "URL", fa: "آدرس اینترنتی" },
    description: {
      en: "Matches http/https web addresses",
      fa: "آدرس‌های وب http و https را تشخیص می‌دهد",
    },
    pattern: "^https?:\\/\\/[\\w.-]+\\.[a-z]{2,}(\\/\\S*)?$",
    flags: "i",
    examples: [
      { value: "https://example.com/path", valid: true },
      { value: "example.com", valid: false },
    ],
  },
  {
    id: "strong-password",
    icon: "🔐",
    name: { en: "Strong Password", fa: "رمز عبور قوی" },
    description: {
      en: "At least 8 chars, one letter, one number",
      fa: "حداقل ۸ کاراکتر، شامل حرف و عدد",
    },
    pattern: "^(?=.*[A-Za-z])(?=.*\\d).{8,}$",
    flags: "",
    examples: [
      { value: "Passw0rd", valid: true },
      { value: "weak", valid: false },
    ],
  },
  {
    id: "username",
    icon: "🆔",
    name: { en: "Username", fa: "نام کاربری" },
    description: {
      en: "Letters, numbers, underscore, 3–16 chars",
      fa: "حروف، عدد و آندرلاین، ۳ تا ۱۶ کاراکتر",
    },
    pattern: "^[a-zA-Z0-9_]{3,16}$",
    flags: "",
    examples: [
      { value: "amir_dev", valid: true },
      { value: "a", valid: false },
    ],
  },
  {
    id: "numbers-only",
    icon: "🔢",
    name: { en: "Numbers Only", fa: "فقط عدد" },
    description: {
      en: "One or more digits, nothing else",
      fa: "یک یا چند رقم، بدون هیچ کاراکتر دیگر",
    },
    pattern: "^\\d+$",
    flags: "",
    examples: [
      { value: "20260826", valid: true },
      { value: "20a6", valid: false },
    ],
  },
  {
    id: "letters-only",
    icon: "🔤",
    name: { en: "Letters Only", fa: "فقط حروف" },
    description: {
      en: "One or more letters, nothing else",
      fa: "یک یا چند حرف، بدون هیچ کاراکتر دیگر",
    },
    pattern: "^[A-Za-z]+$",
    flags: "",
    examples: [
      { value: "RegexLab", valid: true },
      { value: "Regex99", valid: false },
    ],
  },
  {
    id: "credit-card",
    icon: "💳",
    name: { en: "Credit Card", fa: "کارت بانکی" },
    description: {
      en: "16 digits, optionally split in groups of 4",
      fa: "۱۶ رقم، با یا بدون فاصله هر ۴ رقم",
    },
    pattern: "^\\d{4}[- ]?\\d{4}[- ]?\\d{4}[- ]?\\d{4}$",
    flags: "",
    examples: [
      { value: "4111 1111 1111 1111", valid: true },
      { value: "4111-1111-1111", valid: false },
    ],
  },
  {
    id: "date",
    icon: "📅",
    name: { en: "Date", fa: "تاریخ" },
    description: {
      en: "ISO date format: YYYY-MM-DD",
      fa: "فرمت تاریخ ایزو: YYYY-MM-DD",
    },
    pattern: "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$",
    flags: "",
    examples: [
      { value: "2026-08-26", valid: true },
      { value: "2026-13-40", valid: false },
    ],
  },
  {
    id: "time",
    icon: "⏰",
    name: { en: "Time", fa: "ساعت" },
    description: {
      en: "24-hour time format: HH:MM",
      fa: "فرمت ساعت ۲۴ ساعته: HH:MM",
    },
    pattern: "^([01]\\d|2[0-3]):[0-5]\\d$",
    flags: "",
    examples: [
      { value: "23:45", valid: true },
      { value: "25:61", valid: false },
    ],
  },
];

export const getPresetById = (id) =>
  REGEX_PRESETS.find((preset) => preset.id === id) ?? null;