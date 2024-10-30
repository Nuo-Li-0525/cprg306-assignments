"use client";

import { useState, useMemo } from "react";
import Item from "./item";

export default function ItemList({ items }) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "category") {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });
  }, [items, sortBy]);

  const groupItemsByCategory = () => {
    return sortedItems.reduce((groups, item) => {
      const standardizedCategory = item.category.trim().toLowerCase();
      if (!groups[standardizedCategory]) {
        groups[standardizedCategory] = [];
      }
      groups[standardizedCategory].push(item);
      return groups;
    }, {});
  };

  const groupedItems = useMemo(() => groupItemsByCategory(), [sortedItems]);

  const sortedCategories = useMemo(() => {
    return Object.keys(groupedItems).sort((a, b) => a.localeCompare(b));
  }, [groupedItems]);

  const getButtonClass = (currentSort) => {
    return `${
      sortBy === currentSort ? "bg-rose-600" : "bg-rose-300"
    } p-1 m-2 w-28`;
  };

  return (
    <div>
      <label htmlFor="sort">Sort by: </label>
      <button
        onClick={() => setSortBy("name")}
        className={getButtonClass("name")}
      >
        Name
      </button>
      <button
        onClick={() => setSortBy("category")}
        className={getButtonClass("category")}
      >
        Category
      </button>
      <button
        onClick={() => setSortBy("groupedCategory")}
        className={getButtonClass("groupedCategory")}
      >
        Grouped Category
      </button>

      {sortBy === "groupedCategory" ? (
        <div>
          {sortedCategories.map((category) => (
            <div key={category}>
              <h3 className="capitalize text-xl">{category}</h3>
              <ul>
                {groupedItems[category].map((item) => (
                  <Item
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul>
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
