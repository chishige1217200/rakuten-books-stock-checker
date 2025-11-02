import ItemCard from "./ItemCard";

export default function Main() {
  const ids = ["18349522", "18210481", "99999999"];

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
