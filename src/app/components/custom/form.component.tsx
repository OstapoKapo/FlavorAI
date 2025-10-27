"use client";

import { useForm, FieldValues } from "react-hook-form";
import InputField from "./inputField.component";
import TextAreaField from "./textAreaField.component"
import { CustomFormProps } from "@/types/customForm.types";
import CustomButton from "./customButton.component";

const CustomForm = <T extends FieldValues>({ fields, onSubmit, submitText = "Submit" }: CustomFormProps<T>) => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<T>({ mode: "onChange" });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7 w-full max-w-md">
      {fields.map((field) => {
        const rules = typeof field.validation === "function" ? field.validation(getValues) : field.validation;

        if (field.type === "textarea") {
          return (
            <TextAreaField
              key={field.name}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              register={register}
              errors={errors}
              validation={rules}
            />
          );
        }

        return (
          <InputField
            key={field.name}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            register={register}
            error={errors[field.name] as import("react-hook-form").FieldError | undefined }
            validation={rules}
          />
        );
      })}

      <CustomButton type="submit">{submitText}</CustomButton>
    </form>
  );
};

export default CustomForm;
