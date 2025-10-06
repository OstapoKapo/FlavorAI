'use client';

import { CustomButtonProps } from "./types";

const CustomButton: React.FC<CustomButtonProps> = ({ children, onClick, type = "button", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#ff7f50] cursor-pointer text-white py-2 px-4 rounded hover:bg-[#ff6b3d] transition-colors ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}

export default CustomButton;