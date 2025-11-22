"use client";
import { useState } from "react";
import ItemCard from "./ItemCard";
import TagInput from "./TagInput";
import { arrayToCommaString, commaStringToArray } from "@/lib/stringUtil";

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
