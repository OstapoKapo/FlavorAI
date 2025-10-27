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
    images?: string[];
    createdAt: string;
    updatedAt: string;
}

export type Ingredient = {
    name: string;
    amount: number;
    unit: "ml" | "g" | "pcs";
}
