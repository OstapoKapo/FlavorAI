'use client'
import { loginConfig } from "@/config/auth.config";
import CustomForm from "../custom/form.component";
import Link from "next/link";
import { useLoginMutation } from "@/api/auth/auth.mutation";
import { ILoginPayload } from "@/types/auth.types";
import { FieldValues, SubmitHandler } from "react-hook-form";

export default function LoginContainer() {

  const loginMutation = useLoginMutation();

  const handleSubmit: SubmitHandler<ILoginPayload> = (data): void => {
    console.log("Form data:", data);
    loginMutation.mutate(data);
  };

  return (
    <div className="items-center flex gap-20 flex-col justify-items-center min-h-screen p-8 pb-20 sm:p-20">
      <h1 className="text-4xl font-bold ">Welcome to FlavorAI</h1>
      <p className="text-lg">Create or find recipes based on ingredients you have.</p>
      <CustomForm fields={loginConfig} onSubmit={handleSubmit} submitText="Login" />
      <p>Don't have an account? <Link href="/signup" className="text-blue-500">Sign up</Link></p>
    </div>
  );
}
