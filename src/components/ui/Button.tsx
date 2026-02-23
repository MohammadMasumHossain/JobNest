import { ChevronRight } from "lucide-react";

type ButtonProps = {
  label: string;
  type?: "button" | "submit" | "reset";
  variant?: "confirm" | "Delete";
  onClick?: () => void;
  disabled?: boolean;
  className?: string; // ✅ Add this line
};

const Button: React.FC<ButtonProps> = ({
  label,
  type = "button",
  variant = "confirm",
  onClick,
  disabled = false,
  className = "", // ✅ default to empty string
}) => {
  const styles = {
    confirm: "bg-orange-500 text-white",
    Delete: "bg-gray-400 hover:bg-red-500 text-black",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group flex justify-center items-center border mt-8 px-3 rounded-md py-2 w-40 bg-[#FF8A00] font-bold text-md cursor-pointer text-white ${styles[variant]} ${className}`}
    >
      <span className="transition duration-300 group-hover:-translate-x-3">
        {label}
      </span>
      <span className="w-5 h-5 opacity-0  group-hover:opacity-100 group-hover:translate-x-3 transition duration-300">
        <ChevronRight size={20} />
      </span>
    </button>
  );
};

export default Button;
