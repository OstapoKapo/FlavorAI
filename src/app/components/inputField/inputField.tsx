"use client";

import { useState } from "react";
import InputError from "../inputError/inputError";
import { InputFieldProps } from "./types";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; 

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  register,
  errors,
  validation,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const hasError = !!errors[name];

  const isPasswordField = type === "password";

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col relative">
      {label && <label className="mb-1 font-medium">{label}</label>}
      <div className="relative">
        <input
          type={isPasswordField && showPassword ? "text" : type}
          placeholder={placeholder}
          {...register(name, validation)}
          className={`w-full border rounded p-2 pr-10 focus:outline-none focus:ring ${
            hasError ? "border-red-500" : "border-gray-400"
          }`}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeSlashIcon className="w-5 h-5 cursor-pointer text-[#ff7f50]" /> : <EyeIcon className="w-5 h-5 cursor-pointer text-[#ff7f50]" />}
          </button>
        )}
      </div>
      <InputError message={errors[name]?.message?.toString()} />
    </div>
  );
};

export default InputField;
