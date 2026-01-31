import React from "react";
import plus from "../assets/plus.svg";
import Ingredients from "../components/Ingredients";
export default function RecipeForm() {
  return (
    <div className="mx-auto max-w-md mb-6 border-2 border-white p-4">
      <h1 className="text-2xl font-bold text-orange-500 text-center">
        Recipe Create Form
      </h1>
      <form action="" className="space-y-5">
        <input type="text" placeholder="Recipe Title" className="w-full p-1" />
        <textarea
          placeholder="Recipe Description"
          rows="5"
          className="w-full p-1"
        />
        <div className="flex space-x-2 items-center">
          <input
            type="text"
            placeholder="Recipe Ingredient"
            className="w-full p-1"
          />
          <img src={plus} alt="" className="cursor-pointer" />
        </div>
        <div>
          <Ingredients ingredients={["3eggs", "water"]} />
        </div>
        <button className="w-full px-3 py-1 rounded-full bg-orange-400 text-white hover:bg-orange-300">
          Create Recipe
        </button>
      </form>
    </div>
  );
}
