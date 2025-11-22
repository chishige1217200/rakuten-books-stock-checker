import { commaStringToArray } from "@/lib/stringUtil";
import ItemCard from "./ItemCard";

export default function Main() {
  const ids = commaStringToArray(process.env.NEXT_IDS ?? "");

  return (
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
  );
}
