"use client";

import { useCreateRecipeMutation } from "@/api/recipe/recipe.mutation";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

interface RecipeFormValues {
  title: string;
  instructions: string;
  ingredients: Ingredient[];
  image: FileList;
}

const allowedUnits = ["g", "ml", "pcs"];

const CreateRecipePage = () => {
  const {register, control, handleSubmit, formState: { errors }, watch} = useForm<RecipeFormValues>({
    defaultValues: {
      title: "",
      instructions: "",
      ingredients: [{ name: "", amount: 0, unit: "" }],
      image: undefined as any,
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

  const createRecipeMutation = useCreateRecipeMutation();
  

 const onSubmit: SubmitHandler<RecipeFormValues> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("instructions", data.instructions);
    formData.append("ingredients", JSON.stringify(data.ingredients));

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0], data.image[0].name);
    }

    createRecipeMutation.mutate(formData);
};

  const ingredients = watch("ingredients");

  const canAddIngredient = ingredients.every(
    (ing) =>
      ing.name.trim() !== "" &&
      ing.amount > 0 &&
      allowedUnits.includes(ing.unit)
  );

  return (
    <div className="px-8 py-6 max-w-4xl mx-auto min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Create Recipe</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Title</label>
          <input
            placeholder="Recipe title"
            {...register("title", { required: "Title is required" })}
            className={`w-full border rounded p-2 focus:outline-none focus:ring ${
              errors.title ? "border-red-500" : "border-gray-400"
            }`}
          />
          {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
        </div>

        {/* Instructions */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Instructions</label>
          <textarea
            placeholder="Cooking instructions"
            {...register("instructions", { required: "Instructions are required" })}
            className={`w-full border rounded p-2 focus:outline-none focus:ring ${
              errors.instructions ? "border-red-500" : "border-gray-400"
            }`}
          />
          {errors.instructions && (
            <span className="text-red-500 text-sm">{errors.instructions.message}</span>
          )}
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Recipe Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className={`w-full border rounded p-2 focus:outline-none focus:ring ${
              errors.image ? "border-red-500" : "border-gray-400"
            }`}
          />
          {errors.image && (
            <span className="text-red-500 text-sm">{errors.image.message}</span>
          )}
        </div>

        {/* Ingredients */}
        <div className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-end flex-wrap">
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Ingredient Name</label>
                <input
                  placeholder="Name"
                  {...register(`ingredients.${index}.name`, { required: "Ingredient name is required" })}
                  className={`border rounded p-2 focus:outline-none focus:ring ${
                    errors.ingredients?.[index]?.name ? "border-red-500" : "border-gray-400"
                  }`}
                />
                {errors.ingredients?.[index]?.name && (
                  <span className="text-red-500 text-sm">
                    {errors.ingredients[index]?.name?.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Amount</label>
                <input
                  type="number"
                  placeholder="Amount"
                  {...register(`ingredients.${index}.amount`, {
                    required: "Amount is required",
                    valueAsNumber: true,
                    min: { value: 0.1, message: "Amount must be greater than 0" },
                  })}
                  className={`border rounded p-2 focus:outline-none focus:ring ${
                    errors.ingredients?.[index]?.amount ? "border-red-500" : "border-gray-400"
                  }`}
                />
                {errors.ingredients?.[index]?.amount && (
                  <span className="text-red-500 text-sm">
                    {errors.ingredients[index]?.amount?.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Unit</label>
                <input
                  placeholder="g, ml, pcs"
                  {...register(`ingredients.${index}.unit`, {
                    required: "Unit is required",
                    validate: (value) =>
                      allowedUnits.includes(value) || `Unit must be one of: ${allowedUnits.join(", ")}`,
                  })}
                  className={`border rounded p-2 focus:outline-none focus:ring ${
                    errors.ingredients?.[index]?.unit ? "border-red-500" : "border-gray-400"
                  }`}
                />
                {errors.ingredients?.[index]?.unit && (
                  <span className="text-red-500 text-sm">
                    {errors.ingredients[index]?.unit?.message}
                  </span>
                )}
              </div>

              {fields.length > 1 && (
                <button
                  type="button"
                  className="text-red-500 font-bold h-10 mt-6"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          className={`px-4 py-2 rounded ${
            canAddIngredient ? "bg-gray-200" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!canAddIngredient}
          onClick={() => append({ name: "", amount: 0, unit: "" })}
        >
          Add Ingredient
        </button>

        {!canAddIngredient && (
          <span className="text-red-500 text-sm">
            Fill out all current ingredient fields correctly before adding a new one.
          </span>
        )}

        <button
          type="submit"
          className="bg-[#ff7f50] text-white py-2 px-4 rounded hover:bg-[#ff6f40]"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipePage;
