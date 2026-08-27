export const AVAILABLE_FLAGS = [
  { id:"g", label:{ en:"Global — find all matches, not just the first", fa:"سراسری — همه‌ی موارد را پیدا کن، نه فقط اولی" } },
  { id:"i", label:{ en:"Case insensitive", fa:"بدون حساسیت به بزرگی/کوچکی حروف" } },
  { id:"m", label:{ en:"Multiline — ^ and $ match line boundaries", fa:"چندخطی — ^ و $ روی مرز هر خط عمل می‌کنند" } },
  { id:"s", label:{ en:"Dot matches newline too", fa:"نقطه (.) با خط جدید هم مچ می‌شود" } },
  { id:"u", label:{ en:"Unicode mode", fa:"حالت یونیکد" } },
];

export const FLAG_ORDER = AVAILABLE_FLAGS.map(f => f.id);

export const MAX_TEST_LENGTH = 5000;
export const MAX_RENDERED_MATCHES = 50;

export const REGEX_PRESETS = [
  {
    id:"iranian-mobile",
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBmaWxsPSJub25lIiAgICAgZD0ibTQuOTEyIDEwLjU0MWwyLjY0LTIuNjRhMi4wOCAyLjA4IDAgMCAwIC41MDctMi4wNjRhMjcgMjcgMCAwIDEtLjQ5LTEuODQ0QzcuNDUzIDMuNDUgNi45NzYgMyA2LjQyIDNINC45MTJjLTEuMTEgMC0yLjAyMy45MDQtMS45MDEgMi4wMDhjLjkyNiA4LjM5MiA3LjU5IDE1LjA1NSAxNS45ODEgMTUuOTgxYzEuMTA0LjEyMiAyLjAwOC0uNzkgMi4wMDgtMS45di0xLjUxYzAtLjU1NC0uNDUyLTEuMDEtLjk5OC0xLjExYTE1IDE1IDAgMCAxLTEuNzc0LS40NTljLS43NjctLjI0NC0xLjYxOS0uMDcyLTIuMTg4LjQ5NmwtMi41ODEgMi41ODIiLz48L3N2Zz4=",
    name:{ en:"Phone Number", fa:"شماره موبایل" },
    description:{
      en:"Validates Iranian mobile numbers",
      fa:"شماره موبایل ایرانی را اعتبارسنجی می‌کند",
    },
    pattern:"^09\\d{9}$",
    flags:"",
    examples:[
      { value:"09121234567", valid:true },
      { value:"0912345678", valid:false },
    ],
  },

  {
    id:"email",
    icon:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBkPSJtMiA2bDYuOTEzIDMuOTE3YzIuNTQ5IDEuNDQ0IDMuNjI1IDEuNDQ0IDYuMTc0IDBMMjIgNiIvPjxwYXRoIGQ9Ik0yLjAxNiAxMy40NzZjLjA2NSAzLjA2NS4wOTggNC41OTggMS4yMjkgNS43MzNjMS4xMzEgMS4xMzYgMi43MDUgMS4xNzUgNS44NTQgMS4yNTRjMS45NC4wNSAzLjg2Mi4wNSA1LjgwMiAwYzMuMTQ5LS4wNzkgNC43MjMtLjExOCA1Ljg1NC0xLjI1NGMxLjEzMS0xLjEzNSAxLjE2NC0yLjY2OCAxLjIzLTUuNzMzYy4wMi0uOTg2LjAyLTEuOTY2IDAtMi45NTJjLS4wNjYtMy4wNjUtLjA5OS00LjU5OC0xLjIzLTUuNzMzYy0xLjEzMS0xLjEzNi0yLjcwNS0xLjE3NS01Ljg1NC0xLjI1NGExMTUgMTE1IDAgMCAwLTUuODAyIDBjLTMuMTQ5LjA3OS00LjcyMy4xMTgtNS44NTQgMS4yNTRjLTEuMTMxIDEuMTM1LTEuMTY0IDIuNjY4LTEuMjMgNS43MzNhNjkgNjkgMCAwIDAgMCAyLjk1MloiLz48L3N2Zz4=",
    name:{ en:"Email", fa:"ایمیل" },
    description:{
      en:"Validates common email addresses",
      fa:"آدرس‌های ایمیل رایج را اعتبارسنجی می‌کند",
    },
    pattern:"^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    flags:"i",
    examples:[
      { value:"amir@gmail.com", valid:true },
      { value:"amir@@gmail", valid:false },
    ],
  },

  {
    id:"url",
    icon:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxlbGxpcHNlIGN4PSIxMiIgY3k9IjEyIiByeD0iNCIgcnk9IjEwIi8+PHBhdGggICBkPSJNMiAxMmgyMCIvPjwvc3ZnPg==",
    name:{ en:"URL", fa:"آدرس اینترنتی" },
    description:{
      en:"Matches http/https web addresses",
      fa:"آدرس‌های وب http و https را تشخیص می‌دهد",
    },
    pattern:"^https?:\\/\\/[\\w\\.-]+\\.[a-z]{2,}(\\/\\S*)?$",
    flags:"i",
    examples:[
      { value:"https://example.com/path", valid:true },
      { value:"example.com", valid:false },
    ],
  },

  {
    id:"strong-password",
    icon:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCAgICBkPSJNMTQuNDkxIDE1LjVoLjAwOW0tNSAwaC4wMDkiLz48cGF0aCAgZD0iTTQuMjY4IDE4Ljg0NWMuMjI1IDEuNjcgMS42MDggMi45NzkgMy4yOTIgMy4wNTZjMS40MTYuMDY1IDIuODU1LjA5OSA0LjQ0LjA5OXMzLjAyNC0uMDM0IDQuNDQtLjFjMS42ODQtLjA3NiAzLjA2Ny0xLjM4NSAzLjI5Mi0zLjA1NWMuMTQ3LTEuMDkuMjY4LTIuMjA3LjI2OC0zLjM0NXMtLjEyMS0yLjI1NS0uMjY4LTMuMzQ1Yy0uMjI1LTEuNjctMS42MDgtMi45NzktMy4yOTItMy4wNTZBOTUgOTUgMCAwIDAgMTIgOWMtMS41ODUgMC0zLjAyNC4wMzQtNC40NC4xYy0xLjY4NC4wNzYtMy4wNjcgMS4zODUtMy4yOTIgMy4wNTVDNC4xMiAxMy4yNDUgNCAxNC4zNjIgNCAxNS41cy4xMjEgMi4yNTUuMjY4IDMuMzQ1WiIvPjxwYXRoICAgIGQ9Ik03LjUgOVY2LjVhNC41IDQuNSAwIDAgMSA5IDBWOSIvPjwvc3ZnPg==",
    name:{ en:"Strong Password", fa:"رمز عبور قوی" },
    description:{
      en:"At least 8 chars, one letter, one number",
      fa:"حداقل ۸ کاراکتر، شامل حرف و عدد",
    },
    pattern:"^(?=.*[A-Za-z])(?=.*\\d).{8,}$",
    flags:"",
    examples:[
      { value:"Passw0rd", valid:true },
      { value:"weak", valid:false },
    ],
  },

  {
    id:"username",
    icon:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCAgZD0iTTkuMTM1IDIuNWMtMi42NjYuMDYtNC4yMjMuMzE0LTUuMjg3IDEuMzc1QzIuOTE2IDQuODAzIDIuNjA1IDYuMTA3IDIuNSA4LjJtMTIuMzY2LTUuN2MyLjY2Ni4wNiA0LjIyMy4zMTQgNS4yODcgMS4zNzVjLjkzMS45MjggMS4yNDMgMi4yMzIgMS4zNDcgNC4zMjVtLTYuNjM1IDEzLjNjMi42NjctLjA2IDQuMjI0LS4zMTUgNS4yODgtMS4zNzVjLjkzMS0uOTI4IDEuMjQzLTIuMjMzIDEuMzQ3LTQuMzI1TTkuMTM1IDIxLjVjLTIuNjY2LS4wNi00LjIyMy0uMzE1LTUuMjg3LTEuMzc1Yy0uOTMyLS45MjgtMS4yNDMtMi4yMzMtMS4zNDctNC4zMjUiLz48cGF0aCBkPSJNOCAxN2MxLjgzOC0yLjU5NSA2LjExOS0yLjczNyA4IDBtLTEuNS03LjVhMi41IDIuNSAwIDEgMS01IDBhMi41IDIuNSAwIDAgMSA1IDBaIi8+PC9zdmc+",
    name:{ en:"Username", fa:"نام کاربری" },
    description:{
      en:"Letters, numbers, underscore, 3–16 chars",
      fa:"حروف، عدد و آندرلاین، ۳ تا ۱۶ کاراکتر",
    },
    pattern:"^[a-zA-Z0-9_]{3,16}$",
    flags:"",
    examples:[
      { value:"amir_dev", valid:true },
      { value:"a", valid:false },
    ],
  },

  {
    id:"numbers-only",
    icon:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBmaWxsPSJub25lIiAgICAgZD0iTTcgMTBWMy45NWMwLS41NzUgMC0uODYyLS4yMy0uOTMzQzYuMjYzIDIuODU5IDUuNSA0IDUuNSA0TTcgMTBINS41TTcgMTBoMS41bS41IDcuNXYtMS43NWMwLS44MjUgMC0xLjIzNy0uMjkzLTEuNDk0UzcuOTQzIDE0IDcgMTRzLTEuNDE0IDAtMS43MDcuMjU2QzUgMTQuNTEzIDUgMTQuOTI1IDUgMTUuNzVzMCAxLjIzNy4yOTMgMS40OTRzLjc2NC4yNTYgMS43MDcuMjU2em0wIDB2Ljg3NWMwIDEuMjM3IDAgMS44NTYtLjQ0IDIuMjRDOC4xMjIgMjEgNy40MTUgMjEgNiAyMUg1bTExLjUtMVY0bTAgMTZjLS43IDAtMi4wMDgtMS45OTQtMi41LTIuNW0yLjUgMi41Yy43IDAgMi4wMDktMS45OTQgMi41LTIuNSIvPjwvc3ZnPg==",
    name:{ en:"Numbers Only", fa:"فقط عدد" },
    description:{
      en:"One or more digits, nothing else",
      fa:"یک یا چند رقم، بدون هیچ کاراکتر دیگر",
    },
    pattern:"^\\d+$",
    flags:"",
    examples:[
      { value:"20260826", valid:true },
      { value:"20a6", valid:false },
    ],
  },

  {
    id:"letters-only",
    icon:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBmaWxsPSJub25lIiAgICAgZD0iTTQgMTRoNC40MjFjLjkzIDAgMS4zOTUgMCAxLjUyLjI4Yy4xMjMuMjgtLjE5My42MTYtLjgyNiAxLjI4OGwtMy42MzggMy44NjRjLS42MzMuNjcyLS45NSAxLjAwOC0uODI2IDEuMjg4cy41OS4yOCAxLjUyLjI4SDEwTTQgOWwyLjEwNi00LjY5NUM2LjQ5NiAzLjQzNSA2LjY5IDMgNyAzcy41MDQuNDM1Ljg5NCAxLjMwNUwxMCA5bTcuNSAxMVY0bTAgMTZjLS43IDAtMi4wMDgtMS45OTQtMi41LTIuNW0yLjUgMi41Yy43IDAgMi4wMDktMS45OTQgMi41LTIuNSIvPjwvc3ZnPg==",
    name:{ en:"Letters Only", fa:"فقط حروف" },
    description:{
      en:"One or more letters, nothing else",
      fa:"یک یا چند حرف، بدون هیچ کاراکتر دیگر",
    },
    pattern:"^[A-Za-z]+$",
    flags:"",
    examples:[
      { value:"RegexLab", valid:true },
      { value:"Regex99", valid:false },
    ],
  },

  {
    id:"credit-card",
    icon:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCAgZD0iTTIgMTJjMC0zLjUzNyAwLTUuMzA2IDEuMDUzLTYuNDg3cS4yNTMtLjI4NC41NTQtLjUyMkM0Ljg2MiA0IDYuNzQxIDQgMTAuNSA0aDNjMy43NTkgMCA1LjYzOCAwIDYuODkyLjk5cS4zMDIuMjQuNTU1LjUyM0MyMiA2LjY5MyAyMiA4LjQ2MyAyMiAxMnMwIDUuMzA2LTEuMDUzIDYuNDg3YTQuNCA0LjQgMCAwIDEtLjU1NS41MjJDMTkuMTM4IDIwIDE3LjI2IDIwIDEzLjUgMjBoLTNjLTMuNzU5IDAtNS42MzggMC02Ljg5My0uOTlhNC40IDQuNCAwIDAgMS0uNTU0LS41MjNDMiAxNy4zMDcgMiAxNS41MzcgMiAxMiIvPjxwYXRoICBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xMCAxNmgxLjVtMyAwSDE4Ii8+PHBhdGggZD0iTTIgOWgyMCIvPjwvc3ZnPg==",
    name:{ en:"Credit Card", fa:"کارت بانکی" },
    description:{
      en:"16 digits, optionally split in groups of 4",
      fa:"۱۶ رقم، با یا بدون فاصله هر ۴ رقم",
    },
    pattern:"^\\d{4}[- ]?\\d{4}[- ]?\\d{4}[- ]?\\d{4}$",
    flags:"",
    examples:[
      { value:"4111 1111 1111 1111", valid:true },
      { value:"4111-1111-1111", valid:false },
    ],
  },

  {
    id:"date",
    icon:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBkPSJNMTYgMnY0TTggMnY0bTEzIDZjMC0zLjc3MSAwLTUuNjU3LTEuMTcyLTYuODI4UzE2Ljc3MSA0IDEzIDRoLTJDNy4yMjkgNCA1LjM0MyA0IDQuMTcyIDUuMTcyUzMgOC4yMjkgMyAxMnYyYzAgMy43NzEgMCA1LjY1NyAxLjE3MiA2LjgyOFM3LjIyOSAyMiAxMSAyMk0zIDEwaDE4Ii8+PHBhdGggZD0iTTE4LjI2NyAxOC43MDFMMTcgMTh2LTEuNzMzTTIxIDE4YTQgNCAwIDEgMS04IDBhNCA0IDAgMCAxIDggMCIvPjwvc3ZnPg==",
    name:{ en:"Date", fa:"تاریخ" },
    description:{
      en:"ISO date format: YYYY-MM-DD",
      fa:"فرمت تاریخ ایزو: YYYY-MM-DD",
    },
    pattern:"^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$",
    flags:"",
    examples:[
      { value:"2026-08-26", valid:true },
      { value:"2026-13-40", valid:false },
    ],
  },

  {
    id:"time",
    icon:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBkPSJNMTIgMjJjNS41MjMgMCAxMC00LjQ3NyAxMC0xMFMxNy41MjMgMiAxMiAyUzIgNi40NzcgMiAxMnM0LjQ3NyAxMCAxMCAxMFoiLz48cGF0aCAgIGQ9Ik0xMi4wMDggMTAuNTA4YTEuNSAxLjUgMCAxIDAgMCAzYTEuNSAxLjUgMCAwIDAgMC0zbTAgMFY3bTMuMDA3IDguMDJsLTEuOTQ5LTEuOTQ4Ii8+PC9zdmc+",
    name:{ en:"Time", fa:"ساعت" },
    description:{
      en:"24-hour time format: HH:MM",
      fa:"فرمت ساعت ۲۴ ساعته: HH:MM",
    },
    pattern:"^([01]\\d|2[0-3]):[0-5]\\d$",
    flags:"",
    examples:[
      { value:"23:45", valid:true },
      { value:"25:61", valid:false },
    ],
  },
];

export const getPresetById = id =>
  REGEX_PRESETS.find(preset => preset.id === id) ?? null;