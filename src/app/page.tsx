import { getProfile } from "@/api/auth/auth.api";
import { IProfileResponse } from "@/types/auth.types";
import MainContainer from "./components/containers/mainContainer.component";
import { getRecipes } from "@/api/recipe/recipe.api";
import { IGetRecipesRes } from "@/types/recipe.types";
import { RECIPES_PER_PAGE } from "@/config/recipesPerPage.config";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { ReactQueryHydrate } from "./components/layout/queryHidrate.provider";

const Home = async () => {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<IGetRecipesRes>({
    queryKey: ['recipes', 1, RECIPES_PER_PAGE, ''],
    queryFn: () => getRecipes({ page: 1, perPage: RECIPES_PER_PAGE, searchTerm: '' }),
  });

  let user: IProfileResponse | null =  null ;
  try{
    const userRes = await getProfile()
    if(userRes) user = userRes;
    return (
    <ReactQueryHydrate dehydratedState={dehydrate(queryClient)}>
          <MainContainer initialUser={user!.user} />
    </ReactQueryHydrate>
  );
  }catch(err){
    return <div>Error loading user data</div>;
  }
}

export default Home;
