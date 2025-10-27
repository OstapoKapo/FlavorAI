'use client'
import { getRecipes } from "@/api/recipe/recipe.api";
import { IRecipe, IUser } from "@/types/user.types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { RecipeCard } from "../ui/recipeCard.component";
import Pagination from "../ui/pagination.component";
import { useUserStore } from "@/store/user.store";
import { useSearchStore } from "@/store/seatch.store";
import { IGetRecipesRes } from "@/types/recipe.types";
import { RECIPES_PER_PAGE } from "@/config/recipesPerPage.config";
import { RecipesLoading } from "../ui/recipesLoading.component";

interface MainContainerProps {
   initialUser: IUser;
}

export const MainContainer: React.FC<MainContainerProps> = ({ initialUser }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const {searchTerm}: {searchTerm: string} = useSearchStore();

    const {setUser} = useUserStore();
    useEffect(() => {
        setUser(initialUser);
    },[initialUser, setUser]);

    const { data, isLoading, error } = useQuery<IGetRecipesRes>({
        queryKey: ['recipes', currentPage, RECIPES_PER_PAGE, searchTerm], 
        queryFn: () => getRecipes({ page: currentPage, perPage: RECIPES_PER_PAGE, searchTerm }),
        staleTime: 5 * 60 * 1000, 
        gcTime: 10 * 60 * 1000,
        placeholderData: keepPreviousData,
    });

    if (error) return <div>Error loading recipes</div>;

    const recipes: IRecipe[] | undefined = data?.recipes

    return (
        <div className="flex flex-col gap-8 p-8 pb-20 min-h-[calc(100vh-6rem)]">
            {isLoading && <RecipesLoading />}
            <div style={{opacity: isLoading ? 0 : 1}} className="grid h-135 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
