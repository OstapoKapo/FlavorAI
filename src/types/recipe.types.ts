import { IRecipe } from "@/types/user.types";

export interface ICreateRecipeRes {
    recipe: IRecipe
}

export interface IDeleteRecipeRes {
    message: string
}

export interface IGetRecipesRes {
    recipes: IRecipe[];
    totalPages: number;
}

export interface IGetRecipeByIdRes {
    data: IRecipe | null;
}

export interface IGetRecipesParams {
    page: number;
    perPage: number;
    searchTerm: string;
}