export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface RecipeFormValues {
  title: string;
  instructions: string;
  ingredients: Ingredient[];
}