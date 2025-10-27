import { Ingredient } from "@/types/user.types";


interface IngredientsProps {
    ingredients: string;
}

export const Ingredients: React.FC<IngredientsProps> = ({ ingredients }) => {

    const parseedIngredients = JSON.parse(ingredients)

    return (
        <>
            <div className="flex flex-wrap gap-2 mt-2">
                {parseedIngredients.slice(0, 5).map((ing: Ingredient, i: number) => (
                <span
                key={i}
                className="px-4 py-2 bg-[#fffcfb] text-[#ff7f50] rounded-full text-sm font-medium"
                >
                    {ing.name} {ing.amount}
                    {ing.unit}
                </span>
            ))}
            {parseedIngredients.length > 5 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    +{parseedIngredients.length - 5} more
                </span>
            )}
            </div>
        </>
    );
}