"use client";

import { useState } from "react";

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);

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

    alert(`Item Quantity: ${quantity}`);

    setQuantity(1);
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 m-4 bg-white text-white w-45">
      <div className="flex justify-between">
        <span className="text-black">{quantity}</span>
        <div className="flex">
          <button
            type="button"
            onClick={decrement}
            className="w-8 bg-rose-500 text-white font-semibold rounded-lg shadow-md hover:bg-rose-700 focus:outline-none focus:ring-2 disabled:bg-gray-400 focus:ring-rose-400 focus:ring-opacity-75 ml-2"
            disabled={quantity === 1}
          >
            -
          </button>
          <button
            type="button"
            onClick={increment}
            className="w-8 bg-rose-500 text-white font-semibold rounded-lg shadow-md hover:bg-rose-700 focus:outline-none focus:ring-2 disabled:bg-gray-400 focus:ring-rose-400 focus:ring-opacity-75 ml-1"
            disabled={quantity === 20}
          >
            +
          </button>
          <button
            type="submit"
            className="w-16 bg-rose-500 text-white font-semibold rounded-lg shadow-md hover:bg-rose-700 focus:outline-none focus:ring-2 disabled:bg-gray-400 focus:ring-rose-400 focus:ring-opacity-75 ml-1"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
