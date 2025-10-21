import { getRecipeById } from "@/api/recipe/recipe.api";
import RecipePageContainer from "@/app/components/containers/recipePageContainer.component";
import { IGetRecipeByIdRes } from "@/types/recipe.types";
import { IRecipe } from "@/types/user.types";

export const RecipeIDPage = async ({ params }: { params: { id: string } }) => {

    const result: {data: null | IRecipe} = {data: null }

    try{
        const res: IGetRecipeByIdRes = await getRecipeById(params.id);
        if(res) result.data = res.data;
        console.log(res);
    }catch{
        return <div>Error loading recipe data</div>
    }


  return (
    <RecipePageContainer recipe={result.data!} />
  );
}

export default RecipeIDPage;