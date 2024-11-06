"use client";

import { useState, useEffect } from "react";

export default function MealIdeas({
  ingredient,
  onMealSelect,
  selectedMealId,
}) {
  const [meals, setMeals] = useState([]);
  const [mealDetails, setMealDetails] = useState(null);

  useEffect(() => {
    if (ingredient) {
      loadMealIdeas(ingredient);
    }
  }, [ingredient]);

  useEffect(() => {
    if (selectedMealId) {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedMealId}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.meals && data.meals.length > 0) {
            setMealDetails(data.meals[0]);
          }
        })
        .catch((error) => console.error("Error fetching meal details:", error));
    } else {
      setMealDetails(null);
    }
  }, [selectedMealId]);

  const loadMealIdeas = async (ingredient) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await response.json();
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.error("Error fetching meal ideas:", error);
    }
  };

  const extractIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${ingredient} (${measure.trim()})`);
      }
    }
    return ingredients;
  };

  return (
    <div className="flex-1 max-w-lg m-2">
      <h3 className="text-xl font-bold">Meal Ideas</h3>
      {ingredient === "" ? (
        <p>Select an item to see meal ideas</p>
      ) : meals.length === 0 ? (
        <p>No meal ideas found for {ingredient}</p>
      ) : (
        <div>
          <p>Here are some meal ideas using {ingredient}:</p>
          <ul>
            {meals.map((meal) => (
              <li
                key={meal.idMeal}
                className={`p-2 m-1 max-w-sm cursor-pointer ${
                  selectedMealId === meal.idMeal ? "bg-rose-600" : "bg-rose-300"
                }`}
                onClick={() => onMealSelect(meal)}
              >
                <h3 className="text-lg font-bold">{meal.strMeal}</h3>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full rounded-lg mt-2"
                />
                {mealDetails && mealDetails.idMeal === meal.idMeal && (
                  <div className="text-xs text-grey-400">
                    <h4 className="font-bold">Ingredients needed:</h4>
                    <ul>
                      {extractIngredients(mealDetails).map(
                        (ingredient, index) => (
                          <li
                            key={index}
                            className="text-xs ml-6 text-grey-400"
                          >
                            {ingredient}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
