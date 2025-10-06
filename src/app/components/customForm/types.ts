export interface FormField {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  validation?: object;
}

export interface CustomFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
  submitText?: string;
}