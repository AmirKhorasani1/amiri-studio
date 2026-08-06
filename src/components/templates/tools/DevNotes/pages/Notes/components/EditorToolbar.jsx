import React from "react";
import {
  Bold,
  Italic,
  Heading2,
  List,
  ListOrdered,
  Code,
  Quote,
  Link2,
} from "lucide-react";
import { applyMarkdown } from "../utils/helpers";

const TOOLS = [
  { type: "bold", icon: Bold, key: "bold" },
  { type: "italic", icon: Italic, key: "italic" },
  { type: "heading", icon: Heading2, key: "heading" },
  { type: "bullet", icon: List, key: "bullet" },
  { type: "number", icon: ListOrdered, key: "number" },
  { type: "code", icon: Code, key: "code" },
  { type: "quote", icon: Quote, key: "quote" },
  { type: "link", icon: Link2, key: "link" },
];

export default function EditorToolbar({ textareaRef, value, onChange, t }) {
  const handleClick = (type) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const result = applyMarkdown(textarea, type);
    onChange(result.value);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(result.selectionStart, result.selectionEnd);
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border-b-primary pb-3">
      {TOOLS.map(({ type, icon: Icon, key }) => (
        <button
          key={type}
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleClick(type)}
          className="dn-editor-btn text-neutral-400 hover:text-neutral-100"
          title={t[key]}
        >
          <Icon size={18} />
        </button>
      ))}
    </div>
  );
}