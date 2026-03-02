// import { useState } from "react";
// import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form";
// import { CalendarDays, X } from "lucide-react";
// import CustomCalender from "@/components/CustomCalender";
// import ProfileView from "./ProfileView";

// type EducationData = {
//   degree_title: string;
//   university: string;
//   Major: string;
//   passing_year: number;
// };

// type ProfileData = {
//   name: string;
//   email: string;
//   gender: string;
//   age: number;
//   role: string;
//   address: string;
//   mobile: string;
//   education: EducationData[];
//   job_designation: string;
//   company_name: string;
//   start_date: string;
//   end_date: string;
// };

// const initialProfile: ProfileData = {
//   name: "Mohammad Masum Hossain",
//   email: "masum@example.com",
//   gender: "Male",
//   age: 30,
//   role: "Admin",
//   address: "Dhaka, Bangladesh",
//   mobile: "01712345678",
//   education: [
//     {
//       degree_title: "Bachelor of Science in Computer Science",
//       university: "Independent University, Bangladesh",
//       Major: "Computer Science and Engineering",
//       passing_year: 2023,
//     },
//   ],
//   job_designation: "Software Engineer",
//   company_name: "Kirrhosoft Ltd",
//   start_date: "2025-06-01",
//   end_date: "2026-05-31",
// };

// const Profile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState<ProfileData>(initialProfile);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [showCalendar, setShowCalendar] = useState(false);

//   const {
//     handleSubmit,
//     register,
//     control,
//     setValue,
//     formState: { errors },
//     reset,
//   } = useForm<ProfileData>({
//     defaultValues: profile,
//   });

//   const { fields, append } = useFieldArray({
//     control,
//     name: "education",
//   });

//   const onSubmit: SubmitHandler<ProfileData> = (data) => {
//     setProfile(data);
//     setIsEditing(false);
//     console.log("Updated Profile:", data);
//   };

//   return (
//     <div className="  px-4 pt-10 md:pt-6">
//       {isEditing ? (
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//           <div className="bg-white shadow rounded-xl overflow-hidden">
//             <div className="flex px-6 py-4 justify-between bg-gray-800 ">
//               <div className="   text-white font-semibold text-lg">
//                 Profile Information
//               </div>

//               <button
//                 onClick={() => {
//                   reset(profile);
//                   setIsEditing(false);
//                 }}
//               >
//                 <X
//                   size={24}
//                   className="text-white cursor-pointer hover:text-red-500"
//                 />
//               </button>
//             </div>
//             <div className="p-6 grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="font-medium text-gray-700">Full Name</label>
//                 <input
//                   {...register("name", { required: "Name is required" })}
//                   className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
//                 />
//                 {errors.name && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.name.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label className="font-medium text-gray-700">Email</label>
//                 <input
//                   {...register("email", { required: "Email is required" })}
//                   className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label className="font-medium text-gray-700">Role</label>
//                 <input
//                   {...register("role", { required: "Role is required" })}
//                   className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
//                 />
//                 {errors.role && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.role.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label className="font-medium text-gray-700">Gender</label>
//                 <input
//                   {...register("gender")}
//                   className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
//                 />
//               </div>
//               <div>
//                 <label className="font-medium text-gray-700">Phone</label>
//                 <input
//                   {...register("mobile", { required: "Mobile is required" })}
//                   className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
//                 />
//                 {errors.mobile && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.mobile.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label className="font-medium text-gray-700">Age</label>
//                 <input
//                   {...register("age")}
//                   className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="font-medium text-gray-700">Address</label>
//                 <input
//                   {...register("address")}
//                   className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white shadow rounded-xl overflow-hidden">
//             <div className="flex justify-between items-center px-6 py-4 bg-gray-800 rounded-t-xl">
//               <h2 className="text-lg font-semibold text-white">
//                 Educational Background
//               </h2>
//               <button
//                 type="button"
//                 className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded transition"
//                 onClick={() =>
//                   append({
//                     degree_title: "",
//                     university: "",
//                     Major: "",
//                     passing_year: 0,
//                   })
//                 }
//               >
//                 + Add Education
//               </button>
//             </div>

//             <div className="p-6 space-y-6">
//               {fields.map((field, index) => (
//                 <div
//                   key={field.id}
//                   className="relative border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
//                 >
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="font-medium text-gray-700">
//                         Degree
//                       </label>
//                       <input
//                         {...register(
//                           `education.${index}.degree_title` as const,
//                           {
//                             required: "Degree is required",
//                           },
//                         )}
//                         className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm"
//                       />
//                       {errors.education?.[index]?.degree_title && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.education[index]?.degree_title?.message}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="font-medium text-gray-700">
//                         University
//                       </label>
//                       <input
//                         {...register(`education.${index}.university` as const, {
//                           required: "University is required",
//                         })}
//                         className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm"
//                       />
//                       {errors.education?.[index]?.university && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.education[index]?.university?.message}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="font-medium text-gray-700">Major</label>
//                       <input
//                         {...register(`education.${index}.Major` as const)}
//                         className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm"
//                       />
//                     </div>

//                     <div>
//                       <label className="font-medium text-gray-700">
//                         Passing Year
//                       </label>
//                       <input
//                         type="number"
//                         {...register(
//                           `education.${index}.passing_year` as const,
//                         )}
//                         className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white shadow rounded-xl overflow-hidden">
//             <div className="px-6 py-4 bg-gray-800 text-white font-semibold text-lg rounded-t-xl">
//               Work Details
//             </div>
//             <div className="p-6 grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="font-medium text-gray-700">
//                   Job Designation
//                 </label>
//                 <input
//                   {...register("job_designation", {
//                     required: "Job Designation is required",
//                   })}
//                   className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
//                 />
//                 {errors.job_designation && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.job_designation.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label className="font-medium text-gray-700">
//                   Company Name
//                 </label>
//                 <input
//                   {...register("company_name", {
//                     required: "Company Name is required",
//                   })}
//                   className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
//                 />
//                 {errors.company_name && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.company_name.message}
//                   </p>
//                 )}
//               </div>

//               <div className="relative">
//                 <label className="font-medium text-gray-700">Start Date</label>
//                 <div
//                   className="mt-1 w-full flex justify-between items-center px-3 py-2 border border-gray-300 shadow-sm rounded-md bg-white cursor-pointer hover:bg-gray-50 transition"
//                   onClick={() => setShowCalendar(true)}
//                 >
//                   <span
//                     className={selectedDate ? "text-gray-900" : "text-gray-400"}
//                   >
//                     {selectedDate
//                       ? selectedDate.toLocaleDateString("en-GB", {
//                           day: "2-digit",
//                           month: "long",
//                           year: "numeric",
//                         })
//                       : "Select Start Date"}
//                   </span>
//                   <CalendarDays className="w-5 h-5 text-gray-500" />
//                 </div>
//                 {showCalendar && (
//                   <div className="fixed inset-0 z-50 flex items-center justify-center">
//                     <div
//                       className="absolute inset-0 bg-black/50"
//                       onClick={() => setShowCalendar(false)}
//                     />
//                     <div className="relative z-10">
//                       <CustomCalender
//                         value={selectedDate}
//                         onChange={(date) => {
//                           setSelectedDate(date);
//                           setValue(
//                             "start_date",
//                             date.toISOString().split("T")[0],
//                             {
//                               shouldValidate: true,
//                             },
//                           );
//                           setShowCalendar(false);
//                         }}
//                       />
//                     </div>
//                   </div>
//                 )}
//                 <input
//                   type="hidden"
//                   {...register("start_date", {
//                     required: "Start Date is required",
//                   })}
//                 />
//                 {errors.start_date && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.start_date.message}
//                   </p>
//                 )}
//               </div>

//               <div className="relative">
//                 <label className="font-medium text-gray-700">End Date</label>
//                 <div
//                   className="mt-1 w-full flex justify-between items-center px-3 py-2 border border-gray-300 shadow-sm rounded-md bg-white cursor-pointer hover:bg-gray-50 transition"
//                   onClick={() => setShowCalendar(true)}
//                 >
//                   <span
//                     className={selectedDate ? "text-gray-900" : "text-gray-400"}
//                   >
//                     {selectedDate
//                       ? selectedDate.toLocaleDateString("en-GB", {
//                           day: "2-digit",
//                           month: "long",
//                           year: "numeric",
//                         })
//                       : "Select End Date"}
//                   </span>
//                   <CalendarDays className="w-5 h-5 text-gray-500" />
//                 </div>
//                 {showCalendar && (
//                   <div className="fixed inset-0 z-50 flex items-center justify-center">
//                     <div
//                       className="absolute inset-0 bg-black/50"
//                       onClick={() => setShowCalendar(false)}
//                     />
//                     <div className="relative z-10">
//                       <CustomCalender
//                         value={selectedDate}
//                         onChange={(date) => {
//                           setSelectedDate(date);
//                           setValue(
//                             "end_date",
//                             date.toISOString().split("T")[0],
//                             {
//                               shouldValidate: true,
//                             },
//                           );
//                           setShowCalendar(false);
//                         }}
//                       />
//                     </div>
//                   </div>
//                 )}
//                 <input
//                   type="hidden"
//                   {...register("end_date", {
//                     required: "End Date is required",
//                   })}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center space-x-4 ">
//             <button
//               type="button"
//               className="bg-orange-500 w-40 hover:bg-orange-600 text-white px-6 py-2 rounded transition"
//               onClick={() => {
//                 reset(profile);
//                 setIsEditing(false);
//               }}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-orange-500 w-40 hover:bg-orange-600 text-white px-6 py-2 rounded transition"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       ) : (
//         <ProfileView profile={profile} onEdit={() => setIsEditing(true)} />
//       )}
//     </div>
//   );
// };

// export default Profile;
import { useState } from "react";
import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form";
import { CalendarDays, X } from "lucide-react";
import CustomCalender from "@/components/CustomCalender";
import ProfileView from "./ProfileView";

type EducationData = {
  degree_title: string;
  university: string;
  Major: string;
  passing_year: number;
};

type WorkData = {
  job_designation: string;
  company_name: string;
  start_date: string;
  end_date: string;
};

type ProfileData = {
  name: string;
  email: string;
  gender: string;
  age: number;
  role: string;
  address: string;
  mobile: string;
  education: EducationData[];
  work: WorkData[];
};

const initialProfile: ProfileData = {
  name: " Masum Hossain",
  email: "masum@example.com",
  gender: "Male",
  age: 30,
  role: "Admin",
  address: "Dhaka, Bangladesh",
  mobile: "01712345678",
  education: [
    {
      degree_title: "Bachelor of Science in Computer Science",
      university: "Independent University, Bangladesh",
      Major: "Computer Science and Engineering",
      passing_year: 2023,
    },
  ],
  work: [
    {
      job_designation: "Software Engineer",
      company_name: "Kirrhosoft Ltd",
      start_date: "2025-06-01",
      end_date: "2026-05-31",
    },
  ],
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [calendarIndex, setCalendarIndex] = useState<number | null>(null);
  const [calendarField, setCalendarField] = useState<"start_date" | "end_date">(
    "start_date",
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ProfileData>({
    defaultValues: profile,
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  const {
    fields: workFields,
    append: appendWork,
    remove: removeWork,
  } = useFieldArray({
    control,
    name: "work",
  });

  const onSubmit: SubmitHandler<ProfileData> = (data) => {
    setProfile(data);
    setIsEditing(false);
    console.log("Updated Profile:", data);
  };

  const openCalendar = (
    index: number,
    field: "start_date" | "end_date",
    currentValue: string,
  ) => {
    setCalendarIndex(index);
    setCalendarField(field);
    setSelectedDate(currentValue ? new Date(currentValue) : null);
    setShowCalendar(true);
  };

  const handleDateChange = (date: Date) => {
    if (calendarIndex === null) return;
    setValue(
      `work.${calendarIndex}.${calendarField}`,
      date.toISOString().split("T")[0],
      {
        shouldValidate: true,
      },
    );
    setSelectedDate(date);
    setShowCalendar(false);
  };

  return (
    <div className="px-4 pt-10 md:pt-6">
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Profile Info */}
          <div className="bg-white shadow rounded-xl overflow-hidden">
            <div className="flex px-6 py-4 justify-between bg-gray-800 ">
              <div className="text-white font-semibold text-lg">
                Profile Information
              </div>
              <button
                type="button"
                onClick={() => {
                  reset(profile);
                  setIsEditing(false);
                }}
              >
                <X
                  size={24}
                  className="text-white cursor-pointer hover:text-red-500"
                />
              </button>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-6">
              <div>
                <label className="font-medium text-gray-700">Full Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="font-medium text-gray-700">Email</label>
                <input
                  {...register("email", { required: "Email is required" })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="font-medium text-gray-700">Role</label>
                <input
                  {...register("role", { required: "Role is required" })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>
              <div>
                <label className="font-medium text-gray-700">Gender</label>
                <input
                  {...register("gender")}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="font-medium text-gray-700">Phone</label>
                <input
                  {...register("mobile", { required: "Mobile is required" })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mobile.message}
                  </p>
                )}
              </div>
              <div>
                <label className="font-medium text-gray-700">Age</label>
                <input
                  {...register("age")}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="font-medium text-gray-700">Address</label>
                <input
                  {...register("address")}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white shadow rounded-xl overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 bg-gray-800 rounded-t-xl">
              <h2 className="text-lg font-semibold text-white">
                Educational Background
              </h2>
              <button
                type="button"
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded transition"
                onClick={() =>
                  appendEducation({
                    degree_title: "",
                    university: "",
                    Major: "",
                    passing_year: 0,
                  })
                }
              >
                + Add Education
              </button>
            </div>
            <div className="p-6 space-y-6">
              {educationFields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
                >
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => removeEducation(index)}
                  >
                    <X size={20} />
                  </button>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-medium text-gray-700">
                        Degree
                      </label>
                      <input
                        {...register(
                          `education.${index}.degree_title` as const,
                          {
                            required: "Degree is required",
                          },
                        )}
                        className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-gray-700">
                        University
                      </label>
                      <input
                        {...register(`education.${index}.university` as const, {
                          required: "University is required",
                        })}
                        className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-gray-700">Major</label>
                      <input
                        {...register(`education.${index}.Major` as const)}
                        className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-gray-700">
                        Passing Year
                      </label>
                      <input
                        type="number"
                        {...register(
                          `education.${index}.passing_year` as const,
                        )}
                        className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Details */}
          <div className="bg-white shadow rounded-xl overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 bg-gray-800 rounded-t-xl">
              <h2 className="text-lg font-semibold text-white">Work Details</h2>
              <button
                type="button"
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded transition"
                onClick={() =>
                  appendWork({
                    job_designation: "",
                    company_name: "",
                    start_date: "",
                    end_date: "",
                  })
                }
              >
                + Add Work
              </button>
            </div>
            <div className="p-6 space-y-6">
              {workFields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
                >
                  <button
                    type="button"
                    className="absolute top-2 right-2 cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => removeWork(index)}
                  >
                    <X size={20} />
                  </button>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-medium text-gray-700">
                        Job Designation
                      </label>
                      <input
                        {...register(`work.${index}.job_designation` as const, {
                          required: "Job Designation is required",
                        })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-gray-700">
                        Company Name
                      </label>
                      <input
                        {...register(`work.${index}.company_name` as const, {
                          required: "Company Name is required",
                        })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
                      />
                    </div>

                    {/* Start Date */}
                    <div>
                      <label className="font-medium text-gray-700">
                        Start Date
                      </label>
                      <div
                        className="mt-1 w-full flex justify-between items-center px-3 py-2 border border-gray-300 shadow-sm rounded-md bg-white cursor-pointer hover:bg-gray-50 transition"
                        onClick={() =>
                          openCalendar(index, "start_date", field.start_date)
                        }
                      >
                        <span
                          className={
                            field.start_date ? "text-gray-900" : "text-gray-400"
                          }
                        >
                          {field.start_date
                            ? new Date(field.start_date).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                },
                              )
                            : "Select Start Date"}
                        </span>
                        <CalendarDays className="w-5 h-5 text-gray-500" />
                      </div>
                      <input
                        type="hidden"
                        {...register(`work.${index}.start_date` as const)}
                      />
                    </div>

                    {/* End Date */}
                    <div>
                      <label className="font-medium text-gray-700">
                        End Date
                      </label>
                      <div
                        className="mt-1 w-full flex justify-between items-center px-3 py-2 border border-gray-300 shadow-sm rounded-md bg-white cursor-pointer hover:bg-gray-50 transition"
                        onClick={() =>
                          openCalendar(index, "end_date", field.end_date)
                        }
                      >
                        <span
                          className={
                            field.end_date ? "text-gray-900" : "text-gray-400"
                          }
                        >
                          {field.end_date
                            ? new Date(field.end_date).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                },
                              )
                            : "Select End Date"}
                        </span>
                        <CalendarDays className="w-5 h-5 text-gray-500" />
                      </div>
                      <input
                        type="hidden"
                        {...register(`work.${index}.end_date` as const)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              type="button"
              className="bg-orange-500 w-40 hover:bg-orange-600 text-white px-6 py-2 rounded transition"
              onClick={() => {
                reset(profile);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-500 w-40 hover:bg-orange-600 text-white px-6 py-2 rounded transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <ProfileView profile={profile} onEdit={() => setIsEditing(true)} />
      )}

      {showCalendar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowCalendar(false)}
          />
          <div className="relative z-10">
            <CustomCalender value={selectedDate} onChange={handleDateChange} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
