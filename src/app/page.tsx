import { getProfile } from "@/api/auth/auth.api";
import { IProfileResponse } from "@/types/auth.types";
import MainContainer from "./components/containers/mainContainer.component";
import { IRecipe } from "@/types/user.types";
import { getRecipes } from "@/api/recipe/recipe.api";
import { IGetRecipesRes } from "@/types/recipe.types";

const Home = async () => {

  let user:  IProfileResponse | null =  null ;
  let allRecipes: IGetRecipesRes = { recipes: [], totalPages: 1 };
  try{
    const userRes: IProfileResponse | null = await getProfile();
    const recipesRes: IGetRecipesRes | null = await getRecipes({ page: 1, perPage: 3, searchTerm: '' });
    if(userRes) user = userRes;
    if(recipesRes) allRecipes = recipesRes;
  }catch(err){
    return <div>Error loading user data</div>;
  }
  return (
    <MainContainer initialUser={user!.user} initialRecipes={allRecipes} />
  );
}

export default Home;
