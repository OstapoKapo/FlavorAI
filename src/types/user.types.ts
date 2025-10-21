export interface IUser {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    recipes: IRecipe[];
}

export interface IRecipe {
    id: string;
    title: string;
    instructions: string;
    ingredients: string;
    image?: string;
    createdAt: string;
    updatedAt: string;
}