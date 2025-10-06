export const registerConfig = [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Enter your username",
      validation: { required: "This field is required", minLength: { value: 3, message: "Minimum 3 characters" } },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Write your email",
      validation: {
        required: "Email is required",
        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" },
      },
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      validation: { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } },
    },
    {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        placeholder: "Confirm your password",
        validation: (getValues: (field: string) => string) =>  ({ 
            required: "Please confirm your password",  
            minLength: { value: 6, message: "Minimum 6 characters" },
            validate: (value: string) => value === getValues("password") || "Passwords do not match"
        }),
    }
  ];

  export const loginConfig = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Write your email",
      validation: {
        required: "Email is required",
        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" },
      },
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      validation: { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } },
    },
  ];