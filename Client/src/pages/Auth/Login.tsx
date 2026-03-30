import { useState } from "react";
import { Eye, EyeOff, ChevronRight } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, NavLink, Navigate } from "react-router";
import { useAuth } from "@/context/AuthContext";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { setUser, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // const onSubmit: SubmitHandler<Inputs> = async (data) => {
  //   try {
  //     const res = await fetch("http://localhost:5000/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },

  //       body: JSON.stringify(data),
  //       credentials: "include",
  //     });

  //     const result = await res.json();

  //     if (!res.ok) {
  //       toast.error(result.message || "Login failed");
  //       return;
  //     }

  //     // setUser(result.user);
  //     setUser(result);

  //     toast.success("Login successful!");
  //   } catch (err) {
  //     toast.error("Something went wrong!");
  //     console.error(err);
  //   }
  // };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Login failed");
        return;
      }

      setUser({
        name: result.name,
        role: result.role,
        email: result.email,
      });

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
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

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
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

          <div className="relative">
            <label htmlFor="password" className="font-medium block mb-1">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Enter your Password" })}
              placeholder="Password"
              className="mt-1 w-full px-3 py-2 border border-gray-300 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-13 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="group flex items-center justify-center border mt-4 px-3 py-2 w-full bg-[#FF8A00] rounded-md font-bold text-md cursor-pointer text-white transition"
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
