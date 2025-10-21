import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createRecipe } from "./recipe.api";
import { toast } from "react-hot-toast/headless";
import { ICreateRecipeRes } from "@/types/recipe.types";

export const useCreateRecipeMutation = (): UseMutationResult<ICreateRecipeRes, unknown, FormData> => {
    const router = useRouter();
	return useMutation({
		mutationFn: createRecipe,
		onSuccess: () => {
			toast.success('Recipe created successfully');
            router.push('/');
		},
	});
};
