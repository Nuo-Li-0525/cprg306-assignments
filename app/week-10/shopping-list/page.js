"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_utils/auth-context";
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import { getItems, addItem } from "../_services/shopping-list-service";

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      if (user) {
        const userItems = await getItems(user.uid);
        setItems(userItems);
        setIsLoading(false);
      }
    };

    loadItems();
  }, [user]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <div className="p-2 m-2 text-lg">
        <p>You need to be signed in to view this page.</p>
        <button
          onClick={() => router.push("/week-10")}
          className="hover:text-teal-400 hover:underline"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  const handleAddItem = async (newItem) => {
    try {
      const newItemId = await addItem(user.uid, newItem);
      setItems((prevItems) => [...prevItems, { id: newItemId, ...newItem }]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleItemSelect = (item) => {
    const cleanedName = item.name
      .split(",")[0]
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ""
      )
      .trim();
    setSelectedItemName(cleanedName);
    setSelectedMealId(null);
  };

  const handleMealSelect = (meal) => {
    setSelectedMealId((prevMealId) =>
      prevMealId === meal.idMeal ? null : meal.idMeal
    );
  };

  return (
    <main className="p-2 m-2">
      <div className="text-right text-lg">
        <button
          onClick={() => {
            firebaseSignOut();
            router.push("/week-10");
          }}
          className="hover:text-teal-400 hover:underline"
        >
          Sign out
        </button>
      </div>
      <h2 className="text-3xl font-bold mb-4">Shopping List</h2>
      <div className="flex">
        <div className="flex-1 max-w-lg m-2">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <MealIdeas
          ingredient={selectedItemName}
          onMealSelect={handleMealSelect}
          selectedMealId={selectedMealId}
        />
      </div>
    </main>
  );
}
