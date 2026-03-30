import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { ChevronDown, User2, X } from "lucide-react";
import TextField from "@/components/ui/TextField";
import CustomDropDownMenu from "@/components/CustomDropDownMenu";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

export type UserForm = {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
  role: string;
  location: string;
  phone: string;
};

export type UserPayload = Omit<UserForm, "confirmpassword">;

const roles = ["Admin", "Employer"];

type CreateUserModalProps = {
  onClose: () => void;
};

const CreateUser = ({ onClose }: CreateUserModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<UserForm>({
    defaultValues: {
      role: "",
      name: "",
    },
  });

  const password = watch("password");

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const onSubmit: SubmitHandler<UserForm> = async (data) => {
    try {
      // Create a payload without confirmpassword
      const payload: UserPayload = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        location: data.location,
        phone: data.phone,
      };

      const res = await axiosInstance.post("/user", payload);

      toast.success("User created successfully!");
      reset();
      onClose();
      console.log("Created user:", res.data);
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.response?.data?.error || "Failed to create user. Try again.",
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-5 right-5 hover:text-gray-600"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold text-center mb-4 flex items-center justify-center gap-2">
          <User2 /> Create New User
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextField
            label="Full Name"
            id="name"
            type="text"
            placeholder="Enter full name"
            register={register("name", { required: "Name is required" })}
            error={errors.name?.message}
            required
          />
          <TextField
            label="Email"
            id="email"
            type="email"
            placeholder="you@example.com"
            register={register("email", { required: "Email is required" })}
            error={errors.email?.message}
            required
          />

          <div className="flex flex-col">
            <label className="font-medium mb-1">
              Role <span className="text-red-600">*</span>
            </label>
            <Controller
              name="role"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <CustomDropDownMenu
                  options={roles}
                  icon={<ChevronDown />}
                  selected={field.value}
                  onSelect={field.onChange}
                />
              )}
            />
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>

          <TextField
            label="Phone Number"
            id="phone"
            type="tel"
            placeholder="Phone number"
            register={register("phone", {
              required: "Phone number is required",
            })}
            error={errors.phone?.message}
            required
          />

          <TextField
            label="Location"
            id="location"
            placeholder="Enter your location"
            register={register("location")}
            error={errors.location?.message}
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
            required
            isPassword
          />

          <TextField
            label="Confirm Password"
            id="confirmpassword"
            type="password"
            placeholder="Confirm password"
            register={register("confirmpassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            error={errors.confirmpassword?.message}
            required
            isPassword
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-semibold py-3 rounded-md shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
