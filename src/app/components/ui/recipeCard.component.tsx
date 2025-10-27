"use client";
import { IRecipe } from "@/types/user.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { ImgSlider } from "./imgSlider.component";
import { Ingredients } from "./ingredients.component";
import { StarRate } from "./starRate.component";

interface RecipeCardProps {
  recipe: IRecipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const router = useRouter();
  const [current, setCurrent] = useState<number>(0);
  const starRating = 1.5555;

  const images: string[] = recipe.images && recipe.images.length > 0 ? recipe.images : ['/icons/food.jpg', '/icons/food.jpg', '/icons/food.jpg'];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => router.push(`/recipe/${recipe.id}`)}
      className="border border-gray-200 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex flex-col"
    >
      {images.length > 0 && (
        <ImgSlider styles={{ width: '100%' }} setCurrent={setCurrent} images={images} current={current} title={recipe.title} />
      )}

      <div className="p-4 flex flex-col gap-3 justify-between flex-grow">
        <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold text-gray-900">{recipe.title}</h2>
            <Ingredients ingredients={recipe.ingredients} />
        </div>
        <div className="w-full flex justify-between relative ">
            <span className="text-gray-700 text-sm font-semibold flex items-center"><Heart className="inline-block text-red-500 fill-current" />: 1500</span>
            <StarRate rating={starRating} />
        </div>
      </div>
    </motion.div>
  );
};
