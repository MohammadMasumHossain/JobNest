// import { useForm, Controller, type SubmitHandler } from "react-hook-form";
// import { useEffect } from "react";
// import { ChevronDown, User2 } from "lucide-react";
// import TextField from "@/components/ui/TextField";
// import CustomDropDownMenu from "@/components/CustomDropDownMenu";
// import Modal from "@/components/ui/Modal";

// export type EditUserForm = {
//   _id: string;
//   email: string;
//   password: string;
//   confirmpassword: string;
//   role: string;
//   location: string;
//   phone: string;
// };

// const roles = ["Admin", "Employer"];

// type EditUserProps = {
//   user: EditUserForm;
//   open: boolean;
//   onClose: () => void;
//   onUpdate: (user: EditUserForm) => void;
// };

// const EditUser = ({ user, open, onClose, onUpdate }: EditUserProps) => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors, isSubmitting },
//     reset,
//     getValues,
//   } = useForm<EditUserForm>({
//     defaultValues: user,
//   });

//   // Prefill form whenever the user changes
//   useEffect(() => {
//     reset(user);
//   }, [user, reset]);

//   const onSubmit: SubmitHandler<EditUserForm> = async (data) => {
//     onUpdate(data);
//   };

//   return (
//     <Modal
//       open={open}
//       onOpenChange={onClose}
//       title={
//         <span className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
//           <User2 /> Edit User
//         </span>
//       }
//     >
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <TextField
//           label="Email"
//           id="email"
//           type="email"
//           register={register("email", { required: "Email is required" })}
//           error={errors.email?.message}
//           required
//         />

//         <div className="flex flex-col ">
//           <label className="font-medium mb-1">
//             Role <span className="text-red-600">*</span>
//           </label>
//           <Controller
//             name="role"
//             control={control}
//             rules={{ required: "Role is required" }}
//             render={({ field }) => (
//               <CustomDropDownMenu
//                 options={roles}
//                 icon={<ChevronDown />}
//                 selected={field.value}
//                 onSelect={field.onChange}
//               />
//             )}
//           />
//           {errors.role && (
//             <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
//           )}
//         </div>

//         <TextField
//           label="Location"
//           id="location"
//           register={register("location")}
//           error={errors.location?.message}
//         />

//         <TextField
//           label="Phone Number"
//           id="phone"
//           type="tel"
//           register={register("phone", { required: "Phone number is required" })}
//           error={errors.phone?.message}
//           required
//         />

//         <TextField
//           label="Password"
//           id="password"
//           type="password"
//           placeholder="Enter a strong password"
//           register={register("password", {
//             required: "Password is required",
//             pattern: {
//               value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
//               message:
//                 "Password must be at least 8 characters with letters and numbers",
//             },
//           })}
//           error={errors.password?.message}
//           required
//           isPassword
//         />

//         <TextField
//           label="Confirm Password"
//           id="confirmpassword"
//           type="password"
//           placeholder="Confirm password"
//           register={register("confirmpassword", {
//             required: "Confirm password is required",
//             validate: (value) =>
//               value === getValues("password") || "Passwords do not match",
//           })}
//           error={errors.confirmpassword?.message}
//           required
//           isPassword
//         />

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-semibold py-3 mt-4 rounded-md shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isSubmitting ? "Updating..." : "Update User"}
//         </button>
//       </form>
//     </Modal>
//   );
// };

// export default EditUser;
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { ChevronDown, User2 } from "lucide-react";
import TextField from "@/components/ui/TextField";
import CustomDropDownMenu from "@/components/CustomDropDownMenu";
import Modal from "@/components/ui/Modal";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";

export type EditUserForm = {
  _id: string;
  email: string;
  password: string;
  confirmpassword: string;
  role: string;
  location: string;
  phone: string;
};

const roles = ["Admin", "Employer"];

type EditUserProps = {
  user: EditUserForm;
  open: boolean;
  onClose: () => void;
  onUpdate: (user: EditUserForm) => void;
};

const EditUser = ({ user, open, onClose, onUpdate }: EditUserProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<EditUserForm>({ defaultValues: user });

  useEffect(() => {
    reset(user);
  }, [user, reset]);

  // Only one submit function, using PATCH
  const onSubmit: SubmitHandler<EditUserForm> = async (data) => {
    try {
      // Remove confirmpassword before sending
      const { _id, confirmpassword, ...payload } = data;

      const res = await axiosInstance.patch(`/user/${_id}`, payload);
      toast.success("User updated successfully!");
      onUpdate(res.data);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user");
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={onClose}
      title={
        <span className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <User2 /> Edit User
        </span>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextField
          label="Email"
          id="email"
          type="email"
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
          label="Location"
          id="location"
          register={register("location")}
          error={errors.location?.message}
        />

        <TextField
          label="Phone Number"
          id="phone"
          type="tel"
          register={register("phone", { required: "Phone number is required" })}
          error={errors.phone?.message}
          required
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
              value === getValues("password") || "Passwords do not match",
          })}
          error={errors.confirmpassword?.message}
          required
          isPassword
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-semibold py-3 mt-4 rounded-md shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Updating..." : "Update User"}
        </button>
      </form>
    </Modal>
  );
};

export default EditUser;
