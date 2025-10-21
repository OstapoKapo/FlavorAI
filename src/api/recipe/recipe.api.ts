import { HttpFactoryService } from "@/services/http-factory.service";
import { ICreateRecipeRes, 
    IDeleteRecipeRes, 
    IGetRecipeByIdRes, 
    IGetRecipesParams, 
    IGetRecipesRes } from "@/types/recipe.types";

const httpFactory = new HttpFactoryService();
const http = httpFactory.createHttpService();
const authHttp = httpFactory.createAuthHttpService();

export const createRecipe = async (formData: FormData): Promise<ICreateRecipeRes> => {
    console.log(formData.get('image'));
    return authHttp.post<ICreateRecipeRes, FormData>("recipes", formData );
}

export const getRecipes = async ({ page, perPage, searchTerm }: IGetRecipesParams): Promise<IGetRecipesRes> => {
    return authHttp.get<IGetRecipesRes>(`recipes?page=${page}&perPage=${perPage}&searchTerm=${searchTerm}`);
}

export const getRecipeById = async (id: string): Promise<IGetRecipeByIdRes> => {
    return authHttp.get<IGetRecipeByIdRes>(`recipes/${id}`);
}

export const deleteRecipe = async (id: string): Promise<IDeleteRecipeRes> => {
    return authHttp.delete<IDeleteRecipeRes>(`recipes/${id}`);
}