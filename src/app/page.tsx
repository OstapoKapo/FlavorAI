import { getProfile } from "@/api/auth/auth.api";
import { IProfileResponse } from "@/types/auth.types";
import MainContainer from "./components/containers/mainContainer.component";

const Home = async () => {

  const user: { data: IProfileResponse | null } = { data: null };
  try{
    const result: IProfileResponse | null = await getProfile();
    if(result) user.data = result; 
  }catch(err){
    return <div>Error loading user data</div>;
  }
  return (
    <MainContainer user={user.data!.user} />
  );
}

export default Home;
