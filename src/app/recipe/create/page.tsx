"use client";
import { RecipeForm } from "@/app/components/custom/recipeForm/recipeForm.component";

const CreateRecipePage = () => {

  return (
    <div className="px-8 py-6 max-w-4xl mx-auto min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Create Recipe</h1>
      <RecipeForm />
    </div>
  );
};

export default CreateRecipePage;
