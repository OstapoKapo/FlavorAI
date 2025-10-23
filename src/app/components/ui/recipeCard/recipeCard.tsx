"use client";
import { IRecipe } from "@/types/user.types";
import { useRouter } from "next/navigation";

interface RecipeCardProps {
  recipe: IRecipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const router = useRouter();

  const ingredients = typeof recipe.ingredients === "string"
    ? JSON.parse(recipe.ingredients)
    : recipe.ingredients;

  return (
    <div
      onClick={() => router.push(`/recipe/${recipe.id}`)}
      className="border rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
    >
      {recipe.image && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-xl font-bold">{recipe.title}</h2>
        <p className="text-gray-700">{recipe.instructions}</p>
        <ul className="list-disc list-inside text-gray-600">
          {ingredients.map((ing: any, i: number) => (
            <li key={i}>
              {ing.name} - {ing.amount} {ing.unit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
