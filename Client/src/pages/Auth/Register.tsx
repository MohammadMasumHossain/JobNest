import { BriefcaseBusiness, ChevronRight, CircleUser } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { NavLink } from "react-router";

type Inputs = {
  user: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [role, setRole] = useState<"candidate" | "employer">("candidate");

  const password = watch("password");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("form submitted", data, role);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background ">
      <div className="p-8 bg-white shadow-lg outline outline-gray-200 rounded-lg max-w-sm lg:max-w-lg w-full">
        <h1 className="text-2xl text-[#333] font-bold text-center ">
          Create Your New Account!
        </h1>
        <p className="text-center  mt-2 text-[#808080] text-md  ">
          Already Have an account?{" "}
          <NavLink to="/">
            <span className="text-primary cursor-pointer">Log In!</span>
          </NavLink>
        </p>

        <div className="border shadow-lg py-4 mt-4 px-4">
          <div className="flex rounded overflow-hidden space-x-4">
            <button
              type="button"
              onClick={() => setRole("employer")}
              className={`w-1/2 py-4 hover:bg-orange-400 hover:text-white text-md font-medium cursor-pointer ${
                role === "employer"
                  ? "bg-orange-400 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <div className="flex  justify-center items-center space-x-2">
                <div className="w-5 h-5">
                  <BriefcaseBusiness size={20} />
                </div>
                <div>Employer</div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setRole("candidate")}
              className={`w-1/2 py-2 text-md hover:bg-orange-400 hover:text-white font-medium cursor-pointer ${
                role === "candidate"
                  ? "bg-orange-400 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <div className="flex justify-center space-x-2 items-center">
                <div className="w-5 h-5">
                  <CircleUser size={20} />
                </div>
                <div>Candidate</div>
              </div>
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              id="name"
              type="text"
              {...register("user", {
                required: "Name is required",
              })}
              placeholder="User Name"
              className={` mt-6 w-full px-3 py-2 border  border-gray-300 shadow-sm`}
            />
            {errors.user && (
              <p className=" mt-2  px-1 text-sm text-red-600">
                {errors.user?.message}
              </p>
            )}

            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              placeholder="Email Address"
              className={` mt-6 w-full px-3 py-2 border  border-gray-300 shadow-sm`}
            />
            {errors.email && (
              <p className=" mt-2  px-1 text-sm text-red-600">
                {errors.email?.message}
              </p>
            )}
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Enter your Password",
              })}
              placeholder="Password"
              className={`mt-6 w-full px-3 py-2 border border-gray-300 shadow-sm `}
            />
            {errors.password && (
              <p className=" mt-2  px-1 text-sm text-red-600">
                {errors.password?.message}
              </p>
            )}

            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "Confirm your Password",
                validate: (value) =>
                  value === password || "passwords do not match",
              })}
              placeholder="Repeat Password"
              className={`mt-6 w-full px-3 py-2 border border-gray-300 shadow-sm `}
            />
            {errors.confirmPassword && (
              <p className=" mt-2  px-1 text-sm text-red-600">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>

          <button
            className=" group flex items-center justify-center border mt-8 px-3 py-2 w-full bg-[#FF8A00] font-bold text-md cursor-pointer text-white"
            type="submit"
          >
            <span className="transition duration-300 group-hover:-translate-x-2">
              Create An Account
            </span>
            <span className="w-5 h-5 opacity-0  group-hover:opacity-100  group-hover:translate-x-2 transition duration-300">
              <ChevronRight size={20} />
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
