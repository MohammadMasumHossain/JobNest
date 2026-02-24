// import { type UseFormRegisterReturn } from "react-hook-form";

// interface TextFieldProps {
//   label: string;
//   id: string;
//   type?: string;
//   placeholder?: string;
//   register: UseFormRegisterReturn;
//   error?: string;
//   required?: boolean;
// }

// const TextField = ({
//   label,
//   id,
//   type = "text",
//   placeholder,
//   register,
//   error,
//   required = false,
// }: TextFieldProps) => {
//   return (
//     <div className="flex flex-col">
//       <label htmlFor={id} className="font-medium mb-1">
//         {label} {required && <span className="text-red-600">*</span>}
//       </label>
//       <input
//         id={id}
//         type={type}
//         placeholder={placeholder}
//         {...register}
//         className={`mt-1 w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
//           error ? "border-red-500" : "border-gray-300"
//         }`}
//       />
//       {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
//     </div>
//   );
// };

// export default TextField;
import { type UseFormRegisterReturn } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface TextFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: string;
  required?: boolean;
  isPassword?: boolean;
}

const TextField = ({
  label,
  id,
  type = "text",
  placeholder,
  register,
  error,
  required = false,
  isPassword = false,
}: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col relative">
      <label htmlFor={id} className="font-medium mb-1">
        {label} {required && <span className="text-red-600">*</span>}
      </label>

      <input
        id={id}
        type={inputType}
        placeholder={placeholder}
        {...register}
        className={`mt-1 w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-12 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default TextField;
