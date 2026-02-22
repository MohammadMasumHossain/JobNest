import { ChevronRight } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { NavLink } from "react-router";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("form submitted", data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background ">
      <div className="p-8 bg-white shadow-lg outline outline-gray-200 rounded-lg max-w-sm lg:max-w-lg w-full">
        <h1 className="text-2xl text-[#333] font-bold text-center ">
          Sign in to Continue
        </h1>
        <p className="text-center  mt-2 text-[#808080] text-md  ">
          Don't Have an Account?{" "}
          <NavLink to="register">
            <span className="text-primary cursor-pointer">Sign Up!</span>
          </NavLink>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <div>
              <label className="font-normal ">Email</label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                placeholder="Email Address"
                className={` mt-1 w-full px-3 py-2 border  border-gray-300 shadow-sm rounded-md`}
              />
              {errors.email && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-normal">Password</label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Enter your Password",
                })}
                placeholder="Password"
                className={`mt-1 w-full px-3 py-2 border border-gray-300 shadow-sm rounded-md`}
              />
              {errors.password && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.password?.message}
                </p>
              )}
            </div>
          </div>

          <NavLink to="/dashboard">
            <button
              className=" group flex items-center justify-center border mt-8 px-3 py-2 w-full bg-[#FF8A00] rounded-md font-bold text-md cursor-pointer text-white"
              type="submit"
            >
              <span className="transition duration-300 group-hover:-translate-x-2">
                Sign In
              </span>
              <span className="w-5 h-5 opacity-0  group-hover:opacity-100  group-hover:translate-x-2 transition duration-300">
                <ChevronRight size={20} />
              </span>
            </button>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;
