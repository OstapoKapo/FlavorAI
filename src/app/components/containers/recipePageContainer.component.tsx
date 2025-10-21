
"use client";

import { IRecipe } from "@/types/user.types";

interface RecipePageContainerProps {
    recipe: IRecipe
}

export const RecipePageContainer: React.FC<RecipePageContainerProps> = ({ recipe }) => {
    const ingredients = JSON.parse(recipe.ingredients); 
    return (
        <div className="min-h-[calc(100vh-5rem)] p-8">
            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
            <p className="mb-2"><strong>Ingredients:</strong></p>
           <ul className="list-disc list-inside text-gray-600">
                                {ingredients.map((ing: any, i: number) => (
                                    <li key={i}>{ing.name} - {ing.amount} {ing.unit}</li>
                                ))}
                            </ul>
            <p className="mb-2"><strong>Instructions:</strong>{recipe.instructions} </p>
        </div>
    )
}

export default RecipePageContainer;