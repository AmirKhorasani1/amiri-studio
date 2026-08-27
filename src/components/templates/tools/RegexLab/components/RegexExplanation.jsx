import React from "react";
import { useLanguage } from "@context/LanguageContext";
import { parseRegex, describeQuantifierRange } from "../utils/regexHelpers";

const translations = {
  en: {
    title: "EXPLANATION",
    empty: "Enter a pattern to see how it works.",
    start: "Start of string",
    end: "End of string",
    digit: "Any digit (0–9)",
    nonDigit: "Any character that is not a digit",
    word: "Any word character",
    nonWord: "Any character that is not a word character",
    whitespace: "Whitespace character",
    nonWhitespace: "Any non-whitespace character",
    wordBoundary: "Word boundary",
    nonWordBoundary: "Not a word boundary",
    newline: "New line",
    tab: "Tab character",
    carriageReturn: "Carriage return",
    any: "Any character",
    quantifierStar: "Zero or more times",
    quantifierPlus: "One or more times",
    quantifierOptional: "Zero or one time",
    quantifierRange: "Repetition",
    alternation: "Either this or that",
    groupStart: "Start of capturing group",
    groupEnd: "End of capturing group",
    nonCapGroupStart: "Start of non-capturing group",
    lookaheadStart: "Start of positive lookahead",
    negLookaheadStart: "Start of negative lookahead",
    charClass: "One character from this set",
    negatedCharClass: "One character not in this set",
    escapedLiteral: "Escaped literal character",
    literal: "Literal text",
  },
  fa: {
    title: "تفسیر",
    empty: "یک الگو وارد کن تا نحوه عملکرد آن نمایش داده شود.",
    start: "شروع رشته",
    end: "پایان رشته",
    digit: "هر رقم از ۰ تا ۹",
    nonDigit: "هر کاراکتری به‌جز رقم",
    word: "هر کاراکتر متنی معتبر",
    nonWord: "هر کاراکتری به‌جز کاراکتر متنی",
    whitespace: "کاراکتر فاصله",
    nonWhitespace: "هر کاراکتری به‌جز فاصله",
    wordBoundary: "مرز یک کلمه",
    nonWordBoundary: "مرز نبودن یک کلمه",
    newline: "خط جدید",
    tab: "کاراکتر Tab",
    carriageReturn: "بازگشت خط",
    any: "هر کاراکتر",
    quantifierStar: "صفر بار یا بیشتر",
    quantifierPlus: "یک بار یا بیشتر",
    quantifierOptional: "صفر یا یک بار",
    quantifierRange: "تکرار",
    alternation: "یا این یا آن",
    groupStart: "شروع گروه",
    groupEnd: "پایان گروه",
    nonCapGroupStart: "شروع گروه بدون Capture",
    lookaheadStart: "شروع Lookahead مثبت",
    negLookaheadStart: "شروع Lookahead منفی",
    charClass: "یک کاراکتر از این مجموعه",
    negatedCharClass: "یک کاراکتر خارج از این مجموعه",
    escapedLiteral: "کاراکتر Literal با Escape",
    literal: "متن عادی",
  },
};

const RegexExplanation = ({ pattern }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const tokens = pattern ? parseRegex(pattern) : [];

  return (
    <section dir={language === "fa" ? "rtl" : "ltr"}>
      <span className="block text-xs font-medium tracking-wide text-secondary">
        {t.title}
      </span>

      {!tokens.length ? (
        <div className="mt-3 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-4 py-5 text-sm text-neutral-500 dark:border-neutral-700 dark:bg-white/[0.03] dark:text-neutral-500">
          {t.empty}
        </div>
      ) : (
        <div className="mt-3 py-2 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-white/[0.03]">
          {tokens.map((item, index) => {
            const description =
              item.type === "quantifierRange"
                ? describeQuantifierRange(item.value, language)
                : t[item.type] || t.literal;

            return (
              <div
                key={`${item.token}-${index}`}
                className="flex items-center gap-3 px-3.5 py-1.5"
              >
                <code
                  dir="ltr"
                  className="flex min-w-[52px] shrink-0 items-center justify-center rounded-lg bg-white px-2 py-1.5 font-mono text-xs font-medium text-black dark:bg-neutral-700 dark:text-white"
                >
                  {item.token}
                </code>

                <span className="min-w-0 text-xs text-neutral-600 dark:text-neutral-400">
                  {description}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default RegexExplanation;