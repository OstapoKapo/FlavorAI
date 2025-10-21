'use client'
import { getRecipes } from "@/api/recipe/recipe.api";
import { IRecipe, IUser } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { RecipeCard } from "../ui/recipeCard/recipeCard";
import Pagination from "../ui/pagination/pagination";
import { useUserStore } from "@/store/user.store";
import { useSearchStore } from "@/store/seatch.store";
import { IGetRecipesRes } from "@/types/recipe.types";

interface MainContainerProps {
   user: IUser;
}

export const MainContainer: React.FC<MainContainerProps> = ({ user }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const heroesPerPage: number = 3;

    const {searchTerm}: {searchTerm: string} = useSearchStore();

    const {setUser} = useUserStore();
    setUser(user);

    const { data, isLoading, error } = useQuery<IGetRecipesRes>({
        queryKey: ['recipes', currentPage, heroesPerPage, searchTerm], 
        queryFn: () => getRecipes({ page: currentPage, perPage: heroesPerPage, searchTerm }), 
    }); 

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading recipes</div>;

    const recipes: IRecipe[] | undefined = data?.recipes

    return (
        <div className="flex flex-col gap-8 p-8 pb-20 min-h-[calc(100vh-5rem)]">
            <div className="grid h-135 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                 {recipes?.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={data?.totalPages || 1}
                onPageChange={setCurrentPage}
            />
        </div>
    ) 
}

export default MainContainer;
