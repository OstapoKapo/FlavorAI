// components/CustomForm.tsx
"use client";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import InputField from "../inputField/inputField";
import { CustomFormProps } from "./types";
import CustomButton from "../customButton/customButton";

const CustomForm: React.FC<CustomFormProps> = ({ fields, onSubmit, submitText = "Submit" }) => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm(
    { mode: "onChange" }
  );

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-7 w-full max-w-md">
     {fields.map((field) => {
        const rules =
          typeof field.validation === "function" ? field.validation(getValues) : field.validation;

        return (
          <InputField
            key={field.name}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            register={register}
            errors={errors}
            validation={rules}
        />
      );
    })}

    <CustomButton onClick={handleSubmit(handleFormSubmit)}>{submitText}</CustomButton>
    </form>
  );
}

export default CustomForm;