import { ChevronDown, ChevronRight } from "lucide-react";

import { useForm, type SubmitHandler } from "react-hook-form";
import "react-calendar/dist/Calendar.css";
import CustomCalender from "@/components/CustomCalender";
import { useState } from "react";
import { CalendarDays } from "lucide-react";
import CustomDropDown from "@/components/CustomDropDownMenu";
import MultiSelectDropDown from "@/components/MultiSelectDropDown";

type Inputs = {
  companyname: string;
  emailAddress: string;
  phoneNumber: string;
  jobcategory: string;
  jobType: string;
  jobLocation: string;
  experienceLevel: string;
  Minsalary: number;
  Maxsalary: number;
  applicationDeadline: string;
  skills: string;

  vacancy: number;

  jobDescription: string;
  JobResponsibilities: string;

  educationalRequirements: string;
  benefits: string;
};

const JobPost = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("form submitted", data);
  };
  const jobType = ["FullTime", "PartTime"];
  const jobTitle = [
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
                id="companyname"
                type="text"
                {...register("companyname", {
                  required: "Company Name is required",
                })}
                placeholder="Company Name"
                className={` mt-1 w-full px-3 py-2 border  border-gray-300 shadow-sm rounded-sm`}
              />
              {errors.companyname && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.companyname?.message}
                </p>
              )}
            </div>

            <div>
              <label className="font-medium">
                Email Address <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="emailAddress"
                type="email"
                {...register("emailAddress", {
                  required: "Email Address is required",
                })}
                placeholder="Email Address"
                className={` mt-1 w-full px-3 py-2 border  border-gray-300 shadow-sm rounded-sm`}
              />
              {errors.companyname && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.companyname?.message}
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
                id="jobLocation"
                type="text"
                {...register("jobLocation", {
                  required: "Job Location is required",
                })}
                placeholder="Job Location"
                className={` mt-1 w-full px-3 py-2 border  border-gray-300 shadow-sm rounded-sm`}
              />
              {errors.jobLocation && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.jobLocation?.message}
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
          <div className="grid grid-cols-1  px-8 pb-4">
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
                id="JobResponsibilities"
                {...register("JobResponsibilities", {
                  required: "Job Responsibilities is required",
                })}
                placeholder="Job Responsibilities"
                className={` mt-1 mb-2 w-full px-3 py-2 border resize-none  border-gray-300 shadow-sm rounded-sm h-32`}
              />
              {errors.JobResponsibilities && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.JobResponsibilities?.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-medium">
                Educational Requirements <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                id="educationalRequirements"
                {...register("educationalRequirements", {
                  required: "Educational Requirements is required",
                })}
                placeholder="Educational Requirements"
                className={` mt-1 mb-2  w-full resize-none px-3 py-2 border  border-gray-300 shadow-sm rounded-sm h-32`}
              />
              {errors.educationalRequirements && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.educationalRequirements?.message}
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

        <button
          type="submit"
          className="group relative flex mx-auto justify-center items-center border mt-4 px-3 rounded-md py-2 w-40 bg-orange-500 font-bold text-md cursor-pointer overflow-hidden text-white"
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

export default JobPost;
