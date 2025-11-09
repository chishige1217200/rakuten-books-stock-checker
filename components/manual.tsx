"use client";
import { useState } from "react";
import ItemCard from "./ItemCard";
import TagInput from "./TagInput";

// string[] → カンマ区切り文字列
function arrayToCommaString(arr: string[]): string {
  return arr.join(",");
}

// カンマ区切り文字列 → string[]
function commaStringToArray(str: string): string[] {
  // 空文字対応・空要素除外のためtrimとfilterを追加
  return str
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export default function Manual() {
  const [ids, setIds] = useState<string[]>(() => {
    let stored: string | null = null;
    if (typeof window !== "undefined") {
      stored = localStorage.getItem("manualIds");
    }
    return stored ? commaStringToArray(stored) : [];
  });

  const tagChange = (tags: string[]) => {
    setIds(tags);
    localStorage.setItem("manualIds", arrayToCommaString(tags));
  };

  return (
    <div>
      <div className="flex justify-center mt-8">
        <TagInput value={ids} onChange={tagChange} />
      </div>
      <div
        className="py-8 px-8"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {ids.map((id) => (
          <ItemCard key={id} id={id} />
        ))}
      </div>
    </div>
  );
}
