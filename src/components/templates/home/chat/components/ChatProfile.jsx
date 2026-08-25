import React from "react";
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineInformationCircle,
} from "react-icons/hi2";
import { useLanguage } from "@context/LanguageContext";

const translations = {
  en: {
    phone: "Phone",
    email: "Email",
    bio: "About",
  },
  fa: {
    phone: "شماره تماس",
    email: "ایمیل",
    bio: "درباره من",
  },
};

const ChatProfile = ({
  avatarUrl,
  name,
  subtitle,
  bio,
  email,
  phone,
  onBack,
}) => {
  const { language } = useLanguage();
  const t = translations[language] ?? translations.en;
  const isRTL = language === "fa";
  const dir = isRTL ? "rtl" : "ltr";

  const itemClass = `
    flex items-center gap-3
    px-4 py-3.5
    transition-colors
    hover:bg-neutral-300/60
    active:bg-neutral-300
    dark:hover:bg-white/5
    dark:active:bg-white/10
  `;

  const iconClass = `
    flex h-9 w-9 shrink-0
    items-center justify-center
    rounded-full
    bg-white
    text-neutral-700
    dark:bg-neutral-800
    dark:text-neutral-300
  `;

  const textClass = `
    min-w-0 flex-1
    ${isRTL ? "text-right" : "text-left"}
  `;

  return (
    <div
      dir={dir}
      className="
        w-full
        overflow-hidden
        rounded-4xl
        bg-neutral-100
        text-neutral-950
        backdrop-blur-md
        dark:bg-neutral-800/95
        dark:text-white
      "
    >
      <div className="no-scrollbar max-h-[85vh] overflow-y-auto px-4 pb-5 pt-7">
        {/* Avatar */}
        <div className="flex flex-col items-center text-center">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="
                h-28 w-28
                rounded-full
                object-cover
                ring-1 ring-black/5
                dark:ring-white/10
              "
            />
          ) : (
            <div
              className="
                flex h-30 w-30
                items-center justify-center
                rounded-full
                bg-white
                text-3xl font-semibold
                text-neutral-800
                ring-1 ring-black/5
                dark:bg-neutral-700
                dark:text-white
                dark:ring-white/10
              "
            >
              {name?.charAt(0)}
            </div>
          )}

          <h2 className="mt-4 text-[19px] font-semibold text-neutral-950 dark:text-white">
            {name}
          </h2>

          <div
            dir={dir}
            className="mt-1 flex items-center justify-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-black dark:bg-white" />
            <span>{subtitle}</span>
          </div>
        </div>

        {/* Information */}
        {(phone || bio || email) && (
          <div
            dir={dir}
            className="
              mt-6 overflow-hidden
              rounded-3xl
              bg-neutral-200/70
              dark:bg-neutral-900/70
            "
          >
            {/* Phone */}
            {phone && (
              <a
                href={`tel:${phone}`}
                dir={dir}
                className={itemClass}
              >
                <div className={iconClass}>
                  <HiOutlinePhone size={17} />
                </div>

                <div dir={dir} className={textClass}>
                  <p className="text-[11px] text-neutral-500">
                    {t.phone}
                  </p>

                  <p
                    dir="ltr"
                    className="
                      mt-0.5 truncate
                      text-sm
                      text-neutral-900
                      dark:text-neutral-200
                      text-left
                    "
                  >
                    {phone}
                  </p>
                </div>
              </a>
            )}

            {phone && bio && (
              <div className="mx-4 border-t border-neutral-300/70 dark:border-neutral-800" />
            )}

            {/* Bio */}
            {bio && (
              <div
                dir={dir}
                className="flex items-start gap-3 px-4 py-3.5"
              >
                <div className={iconClass}>
                  <HiOutlineInformationCircle size={17} />
                </div>

                <div dir={dir} className={textClass}>
                  <p className="text-[11px] text-neutral-500">
                    {t.bio}
                  </p>

                  <p className="mt-0.5 text-sm leading-5 text-neutral-900 dark:text-neutral-200">
                    {bio}
                  </p>
                </div>
              </div>
            )}

            {bio && email && (
              <div className="mx-4 border-t border-neutral-300/70 dark:border-neutral-800" />
            )}

            {/* Email */}
            {email && (
              <a
                href={`mailto:${email}`}
                dir={dir}
                className={itemClass}
              >
                <div className={iconClass}>
                  <HiOutlineEnvelope size={17} />
                </div>

                <div dir={dir} className={textClass}>
                  <p className="text-[11px] text-neutral-500">
                    {t.email}
                  </p>

                  <p
                    dir="ltr"
                    className="
                      mt-0.5 truncate
                      text-sm
                      text-neutral-900
                      dark:text-neutral-200
                      text-left
                    "
                  >
                    {email}
                  </p>
                </div>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatProfile;