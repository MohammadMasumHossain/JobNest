import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import CustomCalender from "@/components/CustomCalender";

type ProfileData = {
  name: string;
  email: string;
  gender: string;
  age: number;
  role: string;
  address: string;
  mobile: string;

  degree_title: string;
  university: string;
  Major: string;
  passing_year: number;

  job_designation: string;
  company_name: string;
  start_date: string;
  end_date: string;
};

const initialProfile: ProfileData = {
  name: "Mohammad Masum Hossain",
  email: "masum@example.com",
  gender: "Male",
  age: 30,
  role: "Admin",
  address: "Dhaka, Bangladesh",
  mobile: "01712345678",

  degree_title: "Bachelor of Science in Computer Science",
  university: "Independent University, Bangladesh",
  passing_year: 2023,
  Major: "Computer Science and Engineering",

  job_designation: "Software Engineer",
  company_name: "Kirrhosoft Ltd",
  start_date: "2025-06-01",
  end_date: "2026-05-31",
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleEditClick = () => {
    reset(profile); // Ensure form has latest data
    setIsEditing(!isEditing);
  };

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ProfileData>({
    defaultValues: profile,
  });
  const onSubmit: SubmitHandler<ProfileData> = (data) => {
    setProfile(data);
    setIsEditing(false);
    console.log("Updated Profile:", data);
  };
  return (
    <div>
      <div className=" ">
        <div className="flex bg-gray-800 text-white justify-between mt-6 mb-6 py-4 rounded-md px-8">
          <div className="flex items-center ">
            <h2 className="text-xl font-semibold ">
              {isEditing ? "Edit Profile" : "Profile Information"}
            </h2>
          </div>
          <div className="flex items-center">
            {isEditing ? (
              <button
                onClick={() => {
                  reset(profile);
                  setIsEditing(false);
                }}
              >
                <X size={20} className="w-8 h-8 text-white" />
              </button>
            ) : (
              <div>
                <button
                  onClick={handleEditClick}
                  className=" bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-accent pb-8 rounded-md shadow-md">
              <div className="mb-6">
                <h1 className="bg-gray-800 text-white font-bold rounded-sm px-4 py-4">
                  Profile Information
                </h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 px-8 gap-8">
                <div className="">
                  <label className=" text-md font-bold text-black">
                    Full Name :
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm "
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-md font-bold text-black">
                    Email :
                  </label>
                  <input
                    {...register("email", { required: "Email is required" })}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm "
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-md font-bold text-black">Role:</label>
                  <input
                    {...register("role", { required: "Role is required" })}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm "
                  />
                  {errors.role && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.role.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-md font-bold text-black">
                    Gender:
                  </label>
                  <input
                    {...register("gender")}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm "
                  />
                </div>
                <div>
                  <label className="text-md font-bold text-black">Phone:</label>
                  <input
                    {...register("mobile", { required: "Mobile is required" })}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm "
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.mobile.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-md font-bold text-black">Age:</label>
                  <input
                    {...register("age")}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="text-md font-bold text-black">
                    Address:
                  </label>
                  <input
                    {...register("address", {})}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-accent pb-8 mt-8 rounded-md shadow-md">
              <div className="mb-6">
                <h1 className="bg-gray-800 text-white font-bold rounded-sm px-4 py-4">
                  Educational Background
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 px-8 mt-6 gap-8">
                <div>
                  <label className="text-md font-bold text-black">
                    Degree:
                  </label>
                  <input
                    {...register("degree_title", {
                      required: "Degree is required",
                    })}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm "
                  />
                  {errors.degree_title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.degree_title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-md font-bold text-black">
                    University:
                  </label>
                  <input
                    {...register("university", {
                      required: "University is required",
                    })}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm "
                  />
                  {errors.university && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.university.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-md font-bold text-black">Major:</label>
                  <input
                    {...register("Major")}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm "
                  />
                </div>
                <div>
                  <label className="text-md font-bold text-black">
                    Passing Year:
                  </label>
                  <input
                    {...register("passing_year", {})}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm "
                  />
                </div>
              </div>
            </div>
            <div className="bg-accent pb-8 mt-8 rounded-md shadow-md">
              <div className="mb-6">
                <h1 className="bg-gray-800 text-white font-bold rounded-sm px-4 py-4">
                  Work Details
                </h1>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 px-8 gap-8">
                  <div>
                    <label className="text-md font-bold text-black">
                      Job Designation:
                    </label>
                    <input
                      {...register("job_designation", {
                        required: "Job Designation is required",
                      })}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm "
                    />
                    {errors.job_designation && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.job_designation.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-md font-bold text-black">
                      Company Name:
                    </label>
                    <input
                      {...register("company_name", {
                        required: "Company Name is required",
                      })}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm "
                    />
                    {errors.company_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.company_name.message}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <label className="font-medium"> Start Date</label>

                    {/* Fake input – styled exactly like Vacancy */}
                    <div
                      className="mt-1 w-full flex justify-between items-center
               px-3 py-2 border border-gray-300 shadow-sm rounded-sm
               bg-white cursor-pointer hover:bg-gray-50 transition"
                      onClick={() => setShowCalendar(true)}
                    >
                      <span
                        className={
                          selectedDate ? "text-gray-900" : "text-gray-400"
                        }
                      >
                        {selectedDate
                          ? selectedDate.toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })
                          : "Select Start Date"}
                      </span>

                      <CalendarDays className="w-5 h-5 text-gray-500" />
                    </div>

                    {/* Calendar Modal */}
                    {showCalendar && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center">
                        {/* Overlay */}
                        <div
                          className="absolute inset-0 bg-black/50"
                          onClick={() => setShowCalendar(false)}
                        />

                        {/* Calendar */}
                        <div className="relative z-10">
                          <CustomCalender
                            value={selectedDate}
                            onChange={(date) => {
                              setSelectedDate(date);
                              setValue(
                                "start_date",
                                date.toISOString().split("T")[0],
                                { shouldValidate: true },
                              );
                              setShowCalendar(false);
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Hidden react-hook-form field */}
                    <input
                      type="hidden"
                      {...register("start_date", {
                        required: "start Date is required",
                      })}
                    />

                    {errors.start_date && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.start_date.message}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <label className="font-medium"> End Date</label>

                    {/* Fake input – styled exactly like Vacancy */}
                    <div
                      className="mt-1 w-full flex justify-between items-center
               px-3 py-2 border border-gray-300 shadow-sm rounded-sm
               bg-white cursor-pointer hover:bg-gray-50 transition"
                      onClick={() => setShowCalendar(true)}
                    >
                      <span
                        className={
                          selectedDate ? "text-gray-900" : "text-gray-400"
                        }
                      >
                        {selectedDate
                          ? selectedDate.toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })
                          : "Select End Date"}
                      </span>

                      <CalendarDays className="w-5 h-5 text-gray-500" />
                    </div>

                    {showCalendar && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div
                          className="absolute inset-0 bg-black/50"
                          onClick={() => setShowCalendar(false)}
                        />

                        <div className="relative z-10">
                          <CustomCalender
                            value={selectedDate}
                            onChange={(date) => {
                              setSelectedDate(date);
                              setValue(
                                "end_date",
                                date.toISOString().split("T")[0],
                                { shouldValidate: true },
                              );
                              setShowCalendar(false);
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <input
                      type="hidden"
                      {...register("end_date", {
                        required: "End Date is required",
                      })}
                    />

                    {errors.start_date && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.start_date.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-2 py-8">
              <button
                type="button"
                onClick={() => {
                  reset(profile);
                  setIsEditing(false);
                }}
                className="bg-orange-500 text-white w-36 cursor-pointer px-4 py-2 rounded-md hover:bg-orange-600 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-orange-500 text-white w-36 cursor-pointer px-4 py-2 rounded-md hover:bg-orange-600 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="mx-auto grid place-items-center  ">
              <div
                className="bg-linear-to-r from-gray-700 to-gray-500 text-white
               flex flex-col justify-center items-center max-w-5xl md:px-60 rounded-md p-6
                 shadow-md"
              >
                <div>
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <p className="text-md items-center justify-center flex opacity-80">
                    {profile.role}
                  </p>
                </div>
                <div className="mt-4 text-md">
                  <div className="flex items-center justify-center flex-col md:flex-row gap-4 opacity-80">
                    <p>{profile.email}</p>
                    <p>{profile.mobile}</p>
                    <p>{profile.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-6 md:mt-14">
              {/* Personal Info */}
              <motion.div
                whileHover={{
                  borderColor: "border-orange-600",
                  scale: 1.05,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="bg-white rounded-md shadow-md p-6 border-t-4 hover:border  border-orange-500"
              >
                <h3 className="text-lg font-semibold mb-4">Personal Info</h3>
                <ul className="space-y-2 text-sm  text-gray-700">
                  <li>
                    <span className="font-medium">Name: {profile.name}</span>
                  </li>
                  <li>
                    <span className="font-medium">Email: {profile.email}</span>
                  </li>
                  <li>
                    <span className="font-medium">
                      Gender: {profile.gender}
                    </span>
                  </li>
                  <li>
                    <span className="font-medium">Age: {profile.age}</span>
                  </li>
                  <li>
                    <span className="font-medium">Role:{profile.role} </span>
                  </li>
                </ul>
              </motion.div>
              {/* Educational background */}
              <motion.div
                whileHover={{
                  borderColor: "border-orange-600",
                  scale: 1.05,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="bg-white rounded-md shadow-md p-6 border-t-4 hover:border border-green-500"
              >
                <h3 className="text-lg font-semibold mb-4">
                  Educational Background
                </h3>
                <ul className="space-y-2 text-sm  text-gray-700">
                  <li>
                    <span className="font-medium">
                      Degree: {profile.degree_title}
                    </span>
                  </li>
                  <li>
                    <span className="font-medium">Major: {profile.Major}</span>
                  </li>
                  <li>
                    <span className="font-medium">
                      University:{profile.university}
                    </span>
                  </li>
                  <li>
                    <span className="font-medium">
                      Passing Year: {profile.passing_year}
                    </span>
                  </li>
                </ul>
              </motion.div>
              {/* Work Details */}
              <motion.div
                whileHover={{
                  borderColor: "border-orange-600",
                  scale: 1.05,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="bg-white rounded-md shadow-md p-6 border-t-4 hover:border border-blue-500"
              >
                <h3 className="text-lg font-semibold mb-4">Work Details</h3>
                <ul className="space-y-2 text-sm  text-gray-700">
                  <li>
                    <span className="font-medium">
                      Designation: {profile.job_designation}
                    </span>
                  </li>
                  <li>
                    <span className="font-medium">
                      Company: {profile.company_name}
                    </span>
                  </li>
                  <li>
                    <span className="font-medium flex items-center">
                      <div>Duration: {profile.start_date} </div>
                      <div className="mx-2 ">
                        <ArrowRight size={16} className="text-red-600" />
                      </div>
                      <div> {profile.end_date}</div>
                    </span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
