import ItemCard from "./ItemCard";

export default function Main() {
  const ids = [
    "18210481",
    "18210487",
    "18351665",
    "18429068",
    "18297054",
    "18311854",
    "18340769",
    "18288689",
    "18288691",
    "18429071",
    "18297055",
    "18288690",
    "18351666",
    "18340770",
    "18311855",
  ];

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
