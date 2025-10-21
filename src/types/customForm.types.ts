import { FieldValues, SubmitHandler } from "react-hook-form";

export interface FormField {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  validation?: object;
}

export interface CustomFormProps<T extends FieldValues> {
  fields: FormField[];
  onSubmit: SubmitHandler<T>;
  submitText?: string;
}