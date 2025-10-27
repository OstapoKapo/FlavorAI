
"use client";
import { IRecipe } from "@/types/user.types";
import { motion } from "framer-motion";
import { useState } from "react";
import { ImgSlider } from "../ui/imgSlider.component";
import { Heart } from "lucide-react";
import { Ingredients } from "../ui/ingredients.component";
import CustomButton from "../custom/customButton.component";
import { StarRate } from "../ui/starRate.component";
import { useQuery } from "@tanstack/react-query";
import { IGetRecipeByIdRes } from "@/types/recipe.types";
import { getRecipeById } from "@/api/recipe/recipe.api";

interface RecipePageContainerProps {
    recipeId: string
}

export const RecipePageContainer: React.FC<RecipePageContainerProps> = ({recipeId}) => {
    const { data, isLoading, isError } = useQuery<IGetRecipeByIdRes>({
        queryKey: ['recipe', recipeId],
        queryFn: () => getRecipeById(recipeId),
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
    });
    if (isLoading) return <div>Loading...</div>;
    const recipe: IRecipe = !isLoading && !isError && data ? data : {} as IRecipe;
    const [current, setCurrent] = useState<number>(0);
    const images: string[] = recipe.images && recipe.images.length > 0 ? recipe.images : ['/icons/food.jpg', '/icons/food.jpg', '/icons/food.jpg'];
   return (
    <div className="w-full min-h-[calc(100vh-6rem)] flex justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className=" max-w-8xl w-full grid grid-cols-3 gap-15 justify-between"
      >
        <div className="col-span-2 flex flex-col gap-6">
          <div className="flex justify-between items-center"> 
            <h1 className="text-4xl font-bold text-gray-900">{recipe.title}</h1>
            <div className="flex items-center gap-10">
              <StarRate rating={3.5} />
              <div className="flex items-center gap-2">
                <Heart className="text-red-500 cursor-pointer" />
                <span className="font-semibold text-gray-700">{1400}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ImgSlider
                setCurrent={setCurrent}
                images={images}
                current={current}
                title={recipe.title}
                styles={{ borderRadius: '1rem', width: '350px', }}
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mt-6 mb-3">Ingredients</h2>
            <Ingredients ingredients={recipe.ingredients} />
          </div>

          <div className=" max-h-54 pr-4">
            <h2 className="text-2xl font-semibold mt-6 mb-3">Instruction</h2>
            <div className="overflow-y-auto h-[80%]">
               <p className="text-gray-700 leading-relaxed">{recipe.instructions}</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi fugit ad vel! Quas sequi aut, voluptas repudiandae quod esse cupiditate adipisci nemo beatae, iure mollitia unde ad inventore exercitationem? Alias.
            Possimus architecto hic maxime velit similique, voluptatem dolorem, natus aperiam minus nemo repellendus iusto doloribus eveniet, ad magni harum! Magnam consequatur fuga beatae repellendus, molestias odio assumenda sapiente delectus id?
            Fuga tempore doloribus aperiam perferendis voluptatum facilis quibusdam? Iusto minus exercitationem earum illo hic omnis harum consectetur sed quibusdam pariatur optio sapiente ullam fuga ad, iste explicabo quam excepturi assumenda?
            Qui ab alias numquam obcaecati maiores nesciunt. Iusto veniam incidunt quaerat ipsum dolorum possimus voluptate, error illum reprehenderit ab commodi atque ducimus quas facilis vitae, repellendus nisi natus nihil necessitatibus.
            Blanditiis soluta recusandae quas quo nostrum vel impedit obcaecati suscipit asperiores dolore ab omnis consectetur v</p>
            </div>         
          </div>
        </div>

        <div className="col-span-1 bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-900">Comments</h2>
          <div className="flex flex-col gap-3">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-800 font-medium">john_doe</p>
              <p className="text-gray-600 text-sm">Amazing recipe! Loved it ❤️</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-800 font-medium">chef_maria</p>
              <p className="text-gray-600 text-sm">Very easy to follow, thanks!</p>
            </div>
          </div>

          <div className="mt-auto flex gap-3 flex-col">
            <div className="flex items-center gap-2">
                <StarRate rating={0} />
              </div>
            <textarea
              placeholder="Write a comment..."
              className="w-full rounded-xl border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-[#ff7f50]"
            />
            <CustomButton onClick={() => {}} disabled={false} styles={'mt-2 bg-[#ff7f50] text-white w-full py-2 rounded-xl hover:bg-[#ff9966] transition'}>Post</CustomButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default RecipePageContainer;