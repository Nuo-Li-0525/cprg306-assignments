export default function Item({ name, quantity, category }) {
  return (
    <li className="p-2 m-4 bg-rose-300 max-w-sm">
      <h2 className="text-x1 font-bold">{name}</h2>
      <div className="text-sm">
        Buy {quantity} in {category}
      </div>
    </li>
  );
}
