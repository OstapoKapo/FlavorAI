'use client';

import { FieldErrors, UseFormRegister } from "react-hook-form";

interface TextAreaFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  validation?: any;
  rows?: number;
};

export default function TextAreaField({name,label,placeholder,register,errors,validation,rows = 4}: TextAreaFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={name} className="font-medium">{label}</label>}
      <textarea
        id={name}
        {...register(name, validation)}
        placeholder={placeholder}
        rows={rows}
        className={`border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#ff7f50] ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">
          {typeof errors[name]?.message === "string"
            ? errors[name]?.message
            : "This field is required"}
        </span>
      )}
    </div>
  );
}
