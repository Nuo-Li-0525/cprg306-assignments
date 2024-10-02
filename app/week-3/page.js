import ItemList from "./item-list";

export default function Page() {
  return (
    <main>
      <div>
        <h2 className="text-3xl font-bold m-2">Shopping List</h2>
        <ItemList />
      </div>
    </main>
  );
}
