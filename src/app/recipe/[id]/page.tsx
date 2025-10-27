import { getRecipeById } from "@/api/recipe/recipe.api";
import RecipePageContainer from "@/app/components/containers/recipePageContainer.component";
import { ReactQueryHydrate } from "@/app/components/layout/queryHidrate.provider";
import { IGetRecipeByIdRes } from "@/types/recipe.types";
import { dehydrate, hydrate, QueryClient } from "@tanstack/react-query";

export const RecipeIDPage = async ({ params }: { params: { id: string } }) => {

    const queryClient = new QueryClient();

    const {id} = await params;

    await queryClient.prefetchQuery<IGetRecipeByIdRes>({
        queryKey: ['recipe', id],
        queryFn: () => getRecipeById(id),
    });

  return (
    <ReactQueryHydrate dehydratedState={dehydrate(queryClient)}>
        <RecipePageContainer recipeId={id} />
    </ReactQueryHydrate>
  );
}

export default RecipeIDPage;