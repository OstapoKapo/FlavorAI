'use client';

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  styles?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, onClick, type = "button", disabled = false, styles}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#ff7f50] font-semibold cursor-pointer text-white py-2 px-4 rounded hover:bg-[#ff6b3d] transition-colors ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${styles ? styles : ""}`}
    >
      {children}
    </button>
  );
}

export default CustomButton;