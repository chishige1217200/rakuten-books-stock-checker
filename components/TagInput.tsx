"use client";
import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";

export type TagInputProps = {
  value: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  allowDuplicates?: boolean;
  disabled?: boolean;
};

function normalizeTag(t: string) {
  return t.trim();
}

function splitByComma(input: string) {
  return input
    .split(",")
    .map((s) => normalizeTag(s))
    .filter((s) => s.length > 0);
}

export default function TagInput({
  value = [],
  onChange,
  placeholder = "商品IDを入力（カンマで区切る）",
  maxTags,
  allowDuplicates = false,
  disabled = false,
}: TagInputProps) {
  const [tags, setTags] = useState<string[]>(value);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const commitInput = (text: string) => {
    const parts = splitByComma(text);
    if (parts.length === 0) return;

    const next = [...tags];
    for (const p of parts) {
      if (!allowDuplicates && next.includes(p)) continue;
      if (typeof maxTags === "number" && next.length >= maxTags) break;
      next.push(p);
    }

    setTags(next);
    onChange?.(next);
    setInput("");
  };

  const removeTag = (idx: number) => {
    const next = tags.filter((_, i) => i !== idx);
    setTags(next);
    onChange?.(next);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.key === "Enter") {
      e.preventDefault();
      commitInput(input);
      return;
    }

    if (e.key === ",") {
      e.preventDefault();
      commitInput(input);
      return;
    }

    // backspace removes last tag when input is empty
    if (e.key === "Backspace" && input === "" && tags.length) {
      e.preventDefault();
      removeTag(tags.length - 1);
    }
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    const text = e.clipboardData.getData("text");
    if (text.includes(",")) {
      e.preventDefault();
      commitInput(text);
    }
  };

  const onBlur = () => {
    if (input.trim() !== "") commitInput(input);
  };

  return (
    <div className={`flex flex-col gap-2 px-2 py-2 text-white`}>
      <div className="flex flex-wrap items-center gap-2 px-3 py-2 rounded-4xl bg-gray-900">
        {tags.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-700 text-sm whitespace-nowrap"
            aria-label={`タグ: ${t}`}
          >
            <span>{t}</span>
            {!disabled && (
              <button
                type="button"
                onClick={() => removeTag(i)}
                className="inline-flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-500"
                aria-label={`タグを削除: ${t}`}
              >
                ×
              </button>
            )}
          </span>
        ))}

        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          onBlur={onBlur}
          disabled={
            disabled || (typeof maxTags === "number" && tags.length >= maxTags)
          }
          placeholder={tags.length === 0 ? placeholder : undefined}
          className="flex-1 min-w-[120px] outline-none py-2 text-sm bg-transparent"
          aria-label="タグ入力"
        />
      </div>
      <div className="text-xs text-gray-500">
        カンマ(,) または Enter で商品IDを確定。Backspace で最後の商品IDを削除。
      </div>
    </div>
  );
}
