import { FieldErrors, RegisterOptions, UseFormGetValues, UseFormRegister } from "react-hook-form";

export interface InputFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  validation?: RegisterOptions;
}