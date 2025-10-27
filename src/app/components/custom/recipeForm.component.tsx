"use client";
import InputField from "./inputField.component";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useCreateRecipeMutation } from "@/api/recipe/recipe.mutation";
import CustomButton from "./customButton.component";

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface RecipeFormValues {
  title: string;
  instructions: string;
  ingredients: Ingredient[];
  image: FileList;
}

const allowedUnits = ["g", "ml", "pcs"];

export const RecipeForm = () => {
  const { register, control, handleSubmit, formState: { errors }, watch } =
    useForm<RecipeFormValues>({
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

    if (data.image?.length > 0) {
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
      <InputField
        name="title"
        label="Title"
        placeholder="Recipe title"
        register={register}
        validation={{ required: "Title is required" }}
        error={errors.title}
      />

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

      <InputField
        name="image"
        label="Recipe Image"
        type="file"
        register={register}
        validation={{ required: "Image is required" }}
        error={errors.image as any}
      />

      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-end flex-wrap">
            <InputField
              name={`ingredients.${index}.name`}
              label="Ingredient Name"
              placeholder="Name"
              register={register}
              validation={{ required: "Ingredient name is required" }}
              error={errors.ingredients?.[index]?.name}
            />

            <InputField
              name={`ingredients.${index}.amount`}
              label="Amount"
              type="number"
              placeholder="Amount"
              register={register}
              validation={{
                required: "Amount is required",
                valueAsNumber: true,
                min: { value: 0.1, message: "Amount must be greater than 0" },
              }}
              error={errors.ingredients?.[index]?.amount}
            />

            <InputField
              name={`ingredients.${index}.unit`}
              label="Unit"
              placeholder="g, ml, pcs"
              register={register}
              validation={{
                required: "Unit is required",
                validate: (value) =>
                  allowedUnits.includes(value) ||
                  `Unit must be one of: ${allowedUnits.join(", ")}`,
              }}
              error={errors.ingredients?.[index]?.unit}
            />

            {fields.length > 1 && (
              <CustomButton onClick={() => remove(index)} styles={'text-red-500 font-bold h-10 mt-6'}>
                Remove
              </CustomButton>
            )}
          </div>
        ))}
      </div>
        
      <CustomButton
        type="button"
        styles={`px-4 py-2 rounded ${
          canAddIngredient ? "bg-gray-200" : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!canAddIngredient}
        onClick={() => append({ name: "", amount: 0, unit: "" })}
      >
        Add Ingredient
      </CustomButton>

      {!canAddIngredient && (
        <span className="text-red-500 text-sm">
          Fill out all current ingredient fields correctly before adding a new one.
        </span>
      )}

      <CustomButton
        type="submit"
        styles="bg-[#ff7f50] text-white py-2 px-4 rounded hover:bg-[#ff6f40]"
      >
        Create Recipe
      </CustomButton>
    </form>
  );
};
