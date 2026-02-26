import { ChevronRight } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, NavLink } from "react-router";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    toast.success("Login successful!");
    console.log("form submitted", data);
    setTimeout(() => navigate("/dashboard"), 500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background px-4">
      <div className="p-6 sm:p-8 bg-white shadow-lg outline outline-gray-200 rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h1 className="text-2xl sm:text-3xl text-[#333] font-bold text-center">
          Sign in to Continue
        </h1>
        <p className="text-center mt-2 text-[#808080] text-sm sm:text-md">
          Don't Have an Account?{" "}
          <NavLink to="/register">
            <span className="text-primary cursor-pointer">Sign Up!</span>
          </NavLink>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="font-medium block mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Email Address"
                className="mt-1 w-full px-3 py-2 border border-gray-300 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="font-medium block mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", { required: "Enter your Password" })}
                placeholder="Password"
                className="mt-1 w-full px-3 py-2 border border-gray-300 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="group flex items-center justify-center border mt-6 px-3 py-2 w-full bg-[#FF8A00] rounded-md font-bold text-md cursor-pointer text-white  transition"
          >
            <span className="transition duration-300 group-hover:-translate-x-2">
              Sign In
            </span>
            <span className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition duration-300">
              <ChevronRight size={20} />
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
