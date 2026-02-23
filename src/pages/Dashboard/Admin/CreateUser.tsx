import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { User2 } from "lucide-react";
import TextField from "@/components/ui/TextField";

export type UserForm = {
  email: string;
  password: string;
  confirmpassword: string;
  role: string;
  location: string;
  phone: string;
};

const roles = ["Admin", "Employer"];

type CreateUserModalProps = {
  onClose: () => void;
};

const CreateUser = ({ onClose }: CreateUserModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserForm>();

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit: SubmitHandler<UserForm> = async (data) => {
    try {
      console.log("Submitting user:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      reset();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-4 flex items-center justify-center gap-2">
          <User2 /> Create New User
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextField
            label="Email"
            id="email"
            type="email"
            placeholder="you@example.com"
            register={register("email", { required: "Email is required" })}
            error={errors.email?.message}
            required={true}
          />

          <TextField
            label="Password"
            id="password"
            type="password"
            placeholder="Enter a strong password"
            register={register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message:
                  "Password must be at least 8 characters with letters and numbers",
              },
            })}
            error={errors.password?.message}
            required={true}
          />

          <TextField
            label="Confirm Password"
            id="confirmpassword"
            type="password"
            placeholder="Confirm password"
            register={register("confirmpassword", {
              required: "Confirm password is required",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message:
                  "Password must be at least 8 characters with letters and numbers",
              },
            })}
            error={errors.confirmpassword?.message}
            required={true}
          />

          <div className="flex flex-col">
            <label htmlFor="role" className="font-medium mb-1">
              Role <span className="text-red-600">*</span>
            </label>
            <select
              id="role"
              {...register("role", { required: "Role is required" })}
              className={`mt-1 w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role} value={role.toLowerCase()}>
                  {role}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>

          <TextField
            label="Location"
            id="location"
            placeholder="Enter your location"
            register={register("location")}
            error={errors.location?.message}
            required={false}
          />

          <TextField
            label="Phone Number"
            id="phone"
            type="tel"
            placeholder="Phone number"
            register={register("phone", {
              required: "Phone number is required",
            })}
            error={errors.phone?.message}
            required={true}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create User"}
          </button>

          {submitSuccess && (
            <p className="text-center text-green-600 font-medium mt-2">
              User created successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
