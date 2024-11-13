"use client";

import { useState } from "react";

export default function NewItem({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("Produce");

  const increment = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const standardizedCategory =
      category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      quantity,
      category: standardizedCategory,
    };

    onAddItem(newItem);

    setName("");
    setQuantity(1);
    setCategory("Produce");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-2 m-4 bg-white text-black max-w-sm w-full rounded-md"
    >
      <div className="mb-2">
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-1 border-2 border-gray-300 p-2 rounded-lg font-sans"
          required
        />
      </div>

      <div className="flex justify-between">
        <div className="p-2 mt-1 mb-1 rounded-md bg-white text-white w-36 border-2 border-gray-300">
          <div className="flex justify-between">
            <span className="text-black">{quantity}</span>
            <div className="flex">
              <button
                type="button"
                onClick={decrement}
                className="w-8 bg-rose-400 text-white font-semibold rounded-lg shadow-md hover:bg-rose-600 focus:outline-none focus:ring-2 disabled:bg-gray-400 focus:ring-rose-300 focus:ring-opacity-75"
                disabled={quantity === 1}
              >
                -
              </button>
              <button
                type="button"
                onClick={increment}
                className="w-8 bg-rose-400 text-white font-semibold rounded-lg shadow-md hover:bg-rose-600 focus:outline-none focus:ring-2 disabled:bg-gray-400 focus:ring-rose-300 focus:ring-opacity-75 ml-1"
                disabled={quantity === 20}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="ml-1 border-2 border-gray-300 p-2 rounded-lg font-sans"
        >
          <option value="" disabled>
            Category
          </option>
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
          <option value="Meat">Meat</option>
          <option value="Frozen Foods">Frozen Foods</option>
          <option value="Canned Goods">Canned Goods</option>
          <option value="Dry Goods">Dry Goods</option>
          <option value="Beverages">Beverages</option>
          <option value="Snacks">Snacks</option>
          <option value="Household">Household</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full mt-4 py-2 px-4 bg-rose-400 text-white font-semibold rounded-lg shadow-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-opacity-75"
      >
        +
      </button>
    </form>
  );
}
