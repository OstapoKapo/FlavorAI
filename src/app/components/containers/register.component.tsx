'use client';
import { registerConfig } from "@/config/authConfig";
import Link from "next/link";
import CustomForm from "../custom/customForm/form";
import { useRegisterMutation } from "@/api/auth/auth.mutation";
import { IRegisterPayload } from "@/types/auth.types";
import { SubmitHandler } from "react-hook-form";

export const SignUpContainer = () => {

    const registerMutation = useRegisterMutation();

    const handleSubmit: SubmitHandler<IRegisterPayload> = (data): void => {
      console.log("Submitted data:", data);
      registerMutation.mutate(data);
    };

  return (
     <div className="items-center flex gap-10 flex-col justify-items-center min-h-screen p-8 pb-20 sm:p-20">
      <h1 className="text-4xl font-bold ">Welcome to FlavorAI</h1>
      <p className="text-lg">Create or find recipes based on ingredients you have.</p>
      <CustomForm fields={registerConfig} onSubmit={handleSubmit} submitText="Sign Up" />
      <p>Already have an account? <Link href="/login" className="text-blue-500">Log in</Link></p>
    </div>
  );
};
export default SignUpContainer;