export default function Item({
  name,
  quantity,
  category,
  onSelect,
  isSelected,
}) {
  return (
    <li
      onClick={onSelect}
      className={`p-2 m-4 max-w-sm cursor-pointer ${
        isSelected ? "bg-rose-600" : "bg-rose-300"
      }`}
    >
      <h2 className="text-xl font-bold">{name}</h2>
      <div className="text-sm">
        Buy {quantity} in {category}
      </div>
    </li>
  );
}
