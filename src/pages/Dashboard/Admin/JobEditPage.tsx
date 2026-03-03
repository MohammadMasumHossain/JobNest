// import React, {
//   useState,
//   useEffect,
//   type ChangeEvent,
//   type FormEvent,
// } from "react";
// import Button from "@/components/ui/Button";
// import * as Dialog from "@radix-ui/react-dialog";
// import { ChevronDown, X } from "lucide-react";

// import CustomDropDownMenu from "@/components/ui/CustomDropDownMenu";

// export type JobData = {
//   id: string;
//   jobTitle: string;
//   company: string;
//   location: string;
//   jobType: string;
//   salary: string;
//   experience: string;
//   status: string;
//   postedDate: string;
//   jobDescription: string;
//   requirements: string[];
//   jobResponsibilities: string[];
//   benefits: string[];
// };

// type JobEditModalProps = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   job: JobData | null;
//   onSave: (updatedJob: JobData) => void;
// };

// const JobEditModal: React.FC<JobEditModalProps> = ({
//   open,
//   onOpenChange,
//   job,
//   onSave,
// }) => {
//   const [formData, setFormData] = useState<JobData | null>(job);

//   useEffect(() => {
//     setFormData(job);
//   }, [job]);

//   if (!formData) return null;

//   const handleInputChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
//   };
//   // Handler for array fields (requirements, responsibilities, benefits)
//   const handleArrayChange = (
//     index: number,
//     field: "requirements" | "jobResponsibilities" | "benefits",
//     value: string,
//   ) => {
//     if (!formData) return;
//     const updatedArray = [...formData[field]];
//     updatedArray[index] = value;
//     setFormData({ ...formData, [field]: updatedArray });
//   };

//   const handleAddArrayItem = (
//     field: "requirements" | "jobResponsibilities" | "benefits",
//   ) => {
//     if (!formData) return;
//     setFormData({ ...formData, [field]: [...formData[field], ""] });
//   };

//   const handleRemoveArrayItem = (
//     field: "requirements" | "jobResponsibilities" | "benefits",
//     index: number,
//   ) => {
//     if (!formData) return;
//     const updatedArray = formData[field].filter((_, i) => i !== index);
//     setFormData({ ...formData, [field]: updatedArray });
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     if (formData) {
//       onSave(formData);
//       onOpenChange(false);
//     }
//   };

//   return (
//     <Dialog.Root open={open} onOpenChange={onOpenChange}>
//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-49" />
//         <Dialog.Content
//           className="
//             fixed top-1/2 left-1/2 z-50
//             w-[95%] sm:w-[85%] md:w-[70%]
//             max-w-4xl
//             max-h-[90vh]
//             -translate-x-1/2 -translate-y-1/2
//             bg-white rounded-md
//             border border-gray-200
//             overflow-y-auto
//             flex flex-col
//           "
//         >
//           {/* header */}
//           <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
//             <h2 className="text-2xl font-semibold text-gray-900">Edit Job</h2>

//             <button
//               onClick={() => onOpenChange(false)}
//               className="p-2 rounded-md hover:bg-gray-100 transition"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           <form className="px-8 py-6 space-y-4" onSubmit={handleSubmit}>
//             {/* Basic Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="jobTitle"
//                 placeholder="Job Title"
//                 value={formData.jobTitle}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-md p-2"
//                 required
//               />
//               <input
//                 type="text"
//                 name="company"
//                 placeholder="Company"
//                 value={formData.company}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-md p-2"
//                 required
//               />
//               <input
//                 type="text"
//                 name="location"
//                 placeholder="Location"
//                 value={formData.location}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-md p-2"
//               />
//               <input
//                 type="text"
//                 name="jobType"
//                 placeholder="Job Type"
//                 value={formData.jobType}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-md p-2"
//               />
//               <input
//                 type="text"
//                 name="salary"
//                 placeholder="Salary"
//                 value={formData.salary}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-md p-2"
//               />
//               <input
//                 type="text"
//                 name="experience"
//                 placeholder="Experience"
//                 value={formData.experience}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-md p-2"
//               />
//               <CustomDropDownMenu
//                 options={["Pending", "Approved", "Rejected"]}
//                 selected={formData.status}
//                 onSelect={(value) =>
//                   setFormData({ ...formData, status: value })
//                 }
//                 icon={
//                   <span className=" flex mt-1 ">
//                     <ChevronDown size={20} />
//                   </span>
//                 } // optional, you can add an icon if you want
//                 rotateIcon={false}
//               />
//             </div>

//             {/* Textareas */}
//             <textarea
//               name="jobDescription"
//               placeholder="Job Description"
//               value={formData.jobDescription}
//               onChange={handleInputChange}
//               className="w-full border resize-none border-gray-300 rounded-md p-2"
//               rows={5}
//             />

//             {/* Array fields */}
//             {(["requirements", "jobResponsibilities", "benefits"] as const).map(
//               (field) => (
//                 <div key={field} className="space-y-2 mt-4">
//                   <h3 className="font-semibold">
//                     {field.charAt(0).toUpperCase() + field.slice(1)}
//                   </h3>
//                   {formData[field].map((item, index) => (
//                     <div key={index} className="flex items-center gap-2 mt-4">
//                       <input
//                         type="text"
//                         value={item}
//                         onChange={(e) =>
//                           handleArrayChange(index, field, e.target.value)
//                         }
//                         className="flex-1 border border-gray-300 rounded-md p-2"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveArrayItem(field, index)}
//                         className="px-2 py-1 bg-red-500 text-white rounded-md"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => handleAddArrayItem(field)}
//                     className="px-3 py-1 bg-green-500 text-white rounded-md mt-2"
//                   >
//                     Add {field.slice(0, -1)}
//                   </button>
//                 </div>
//               ),
//             )}

//             {/* Footer buttons */}
//             <div className="flex justify-end gap-2 mt-4">
//               <Button type="submit" label="Save" variant="confirm" />
//               <Button
//                 type="button"
//                 label="Cancel"
//                 variant="destructive"
//                 onClick={() => onOpenChange(false)}
//               />
//             </div>
//           </form>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// };

// export default JobEditModal;
import { ChevronDown, ChevronRight } from "lucide-react";

import { useForm, type SubmitHandler } from "react-hook-form";
import "react-calendar/dist/Calendar.css";
import CustomCalender from "@/components/CustomCalender";
import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import CustomDropDown from "@/components/ui/CustomDropDownMenu";
import MultiSelectDropDown from "@/components/ui/MultiSelectDropDown";
import { useLocation } from "react-router";

type Inputs = {
  company: string;
  emailAddress: string;
  phoneNumber: string;
  jobcategory: string;
  jobType: string;
  location: string;
  experience: string;
  Minsalary: number;
  Maxsalary: number;
  applicationDeadline: string;
  skills: string;

  vacancy: number;

  jobDescription: string;
  jobResponsibilities: string[];

  requirements: string;
  benefits: string;
};

const JobEditPage = () => {
  const location = useLocation();
  const jobData = location.state?.jobData as Inputs | undefined;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: jobData ?? {},
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("form submitted", data);
  };
  const jobType = ["FullTime", "PartTime"];
  const jobTitle = [
    "Frontend Developer",
    "Engineering",
    "Data Science",
    "Business Analyst",
    "Ui/Ux Design",
    "Video Editing",
    "Finance & Accounting",
  ];
  const experienceLevel = ["Fresher", "1-2 Years", "2-3 Years", "3-4 Years"];
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState(
    jobData?.jobType ?? "",
  );
  const [selectedJobCategory, setSelectedJobCategory] = useState(
    jobData?.jobcategory ?? "",
  );
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState(
    jobData?.experience ?? "",
  );
  const [selectedSkills, setSelectedSkills] = useState(
    jobData?.skills ? jobData.skills.split(",") : [],
  );

  // Autofill on mount
  useEffect(() => {
    if (jobData) {
      Object.keys(jobData).forEach((key) => {
        setValue(key as keyof Inputs, jobData[key as keyof Inputs]);
      });

      if (jobData.applicationDeadline) {
        setSelectedDate(new Date(jobData.applicationDeadline));
      }
      setSelectedJobType(jobData.jobType);
      setSelectedJobCategory(jobData.jobcategory);
      setSelectedExperienceLevel(jobData.experience);
      setSelectedSkills(jobData.skills ? jobData.skills.split(",") : []);
    }
  }, [jobData, setValue]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-accent mt-10 md:mt-0 mb-10 rounded-sm">
          <h2 className="bg-gray-800 text-white font-bold rounded-sm px-4 py-4">
            Job Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 px-8 pb-8 ">
            <div>
              <label className="font-medium">
                Company Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="company"
                type="text"
                {...register("company", {
                  required: "Company Name is required",
                })}
                placeholder="Company Name"
                className={` mt-1 w-full px-3 py-2 border  border-gray-300 shadow-sm rounded-sm`}
              />
              {errors.company && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.company?.message}
                </p>
              )}
            </div>

            <div>
              <label className="font-medium">Job Title</label>
              <CustomDropDown options={jobTitle} icon={<ChevronDown />} />
            </div>

            <div>
              <label className="font-medium">Job Type</label>
              <CustomDropDown options={jobType} icon={<ChevronDown />} />
            </div>

            <div>
              <label className="font-medium">
                Skills <span style={{ color: "red" }}>*</span>
              </label>
              <MultiSelectDropDown
                options={["React", "Next.js", "Node", "MongoDB"]}
                onChange={(values) =>
                  setValue("jobType", values.join(","), {
                    shouldValidate: true,
                  })
                }
              />
            </div>

            <input
              type="hidden"
              {...register("skills", { required: "Job Type is required" })}
            />

            <div>
              <label className="font-medium">Experience Level</label>
              <CustomDropDown
                options={experienceLevel}
                icon={<ChevronDown />}
              />
            </div>

            <div>
              <label className="font-medium">
                Job Location <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="location"
                type="text"
                {...register("location", {
                  required: "Job Location is required",
                })}
                placeholder="Job Location"
                className={` mt-1 w-full px-3 py-2 border  border-gray-300 shadow-sm rounded-sm`}
              />
              {errors.location && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.location?.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-medium">
                Monthly Salary <span style={{ color: "red" }}>*</span>
              </label>
              <div className="grid grid-cols-2 gap-4 ">
                <div>
                  <input
                    id="Minsalary"
                    type="number"
                    min="0"
                    {...register("Minsalary", {
                      required: "Minimum Salary is required",
                      min: {
                        value: 0,
                        message: "Vacancy cannot be negative",
                      },
                    })}
                    placeholder="Min Salary"
                    className="mt-1 w-full px-3 py-2 border  border-gray-300 shadow-sm rounded-sm"
                  />
                  {errors.Minsalary && (
                    <p className=" mt-2  px-1 text-sm text-red-600">
                      {errors.Minsalary?.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    id="Maxsalary"
                    type="number"
                    min="0"
                    {...register("Maxsalary", {
                      required: "Maximum Salary is required",
                      min: {
                        value: 0,
                        message: "Vacancy cannot be negative",
                      },
                    })}
                    placeholder="Max Salary"
                    className="mt-1 w-full px-3 py-2 border  border-gray-300 shadow-sm rounded-sm"
                  />

                  {errors.Maxsalary && (
                    <p className=" mt-2  px-1 text-sm text-red-600">
                      {errors.Maxsalary?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="relative">
              <label className="font-medium">
                Application Deadline <span style={{ color: "red" }}>*</span>
              </label>

              <div
                className="mt-1 w-full flex justify-between items-center
               px-3 py-2 border border-gray-300 shadow-sm rounded-sm
               bg-white cursor-pointer hover:bg-gray-50 transition"
                onClick={() => setShowCalendar(true)}
              >
                <span
                  className={selectedDate ? "text-gray-900" : "text-gray-400"}
                >
                  {selectedDate
                    ? selectedDate.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : "Select application deadline"}
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
                          "applicationDeadline",
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
                {...register("applicationDeadline", {
                  required: "Application deadline is required",
                })}
              />

              {errors.applicationDeadline && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.applicationDeadline.message}
                </p>
              )}
            </div>

            <div>
              <label className="font-medium">Vacancy</label>
              <input
                id="vacancy"
                type="number"
                min="0"
                {...register("vacancy", {
                  min: {
                    value: 0,
                    message: "Vacancy cannot be negative",
                  },
                })}
                placeholder="Vacancy"
                className={` mt-1 w-full px-3 py-2 border  border-gray-300 shadow-sm rounded-sm`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1  px-8 pb-8">
            <div>
              <label className="font-medium">
                Job Description <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                id="jobDescription"
                {...register("jobDescription", {
                  required: "Job Description is required",
                })}
                placeholder="Job Description"
                className={` mt-1 mb-2 w-full px-3 py-2 border resize-none border-gray-300 shadow-sm rounded-sm h-32`}
              />
              {errors.jobDescription && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.jobDescription?.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-medium">
                Job Responsibilities <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                id="jobResponsibilities"
                {...register("jobResponsibilities", {
                  required: "Job Responsibilities is required",
                })}
                placeholder="Job Responsibilities"
                className={` mt-1 mb-2 w-full px-3 py-2 border resize-none  border-gray-300 shadow-sm rounded-sm h-32`}
              />
              {errors.jobResponsibilities && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.jobResponsibilities?.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-medium">
                Educational Requirements <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                id="requirements"
                {...register("requirements", {
                  required: "Educational Requirements is required",
                })}
                placeholder="Educational Requirements"
                className={` mt-1 mb-2  w-full resize-none px-3 py-2 border  border-gray-300 shadow-sm rounded-sm h-32`}
              />
              {errors.requirements && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.requirements?.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-medium">Benefits</label>
              <textarea
                id="benefits"
                {...register("benefits", {})}
                placeholder="Benefits"
                className={` mt-1 mb-2 w-full px-3 py-2 border resize-none  border-gray-300 shadow-sm rounded-sm h-32`}
              />
            </div>
          </div>
        </div>

        <div className="bg-accent  rounded-sm"></div>

        <button
          type="submit"
          className="group relative flex mx-auto justify-center items-center border mt-8 px-3 rounded-md py-2 w-40 bg-orange-500 font-bold text-md cursor-pointer overflow-hidden text-white"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-3">
            Submit job
          </span>

          <span className="absolute 7 opacity-0 transform transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-10">
            <ChevronRight size={20} />
          </span>
        </button>
      </form>
    </div>
  );
};

export default JobEditPage;
