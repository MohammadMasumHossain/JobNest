import { ChevronRight } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  firstName: string;
  lastName: string;
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
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("form submitted", data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-accent mb-10 rounded-sm">
          <h2 className="bg-gray-800 text-white font-bold rounded-sm px-4 py-4">
            General Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 px-8 pb-8 ">
            <div>
              <label className="font-medium">First Name</label>
              <input
                id="firstName"
                type="text"
                {...register("firstName", {
                  required: "First Name is required",
                })}
                placeholder="First Name"
                className={` mt-3 w-full px-3 py-2 border  border-gray-300 shadow-sm rounded-sm`}
              />
              {errors.firstName && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.firstName?.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-medium">Last Name</label>
              <input
                id="lastName"
                type="text"
                {...register("lastName", {
                  required: "Last Name is required",
                })}
                placeholder="Last Name"
                className={`mt-3 w-full px-3 py-2 border border-gray-300 shadow-sm rounded-sm `}
              />
              {errors.lastName && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.lastName?.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-medium">Email Address</label>
              <input
                id="emailAddress"
                type="email"
                {...register("emailAddress", {
                  required: "Email Address is required",
                })}
                placeholder="Email Address"
                className={` mt-3 w-full px-3 py-2 border  border-gray-300 shadow-sm rounded-sm`}
              />
              {errors.emailAddress && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.emailAddress?.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-medium">Phone Number</label>
              <input
                id="phoneNumber"
                type="text"
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                })}
                placeholder="Phone Number"
                className={`mt-3 w-full px-3 py-2 border border-gray-300 shadow-sm rounded-sm `}
              />
              {errors.phoneNumber && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.phoneNumber?.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-medium">Job Category</label>
              <input
                id="jobcategory"
                type="text"
                {...register("jobcategory", {
                  required: "Job Category is required",
                })}
                placeholder="Job Category"
                className={` mt-3 w-full px-3 py-2 border  border-gray-300 shadow-sm rounded-sm`}
              />
              {errors.jobcategory && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.jobcategory?.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-medium">Job Type</label>
              <input
                id="jobType"
                type="text"
                {...register("jobType", {
                  required: "Job Type is required",
                })}
                placeholder="Job Type"
                className={`mt-3 w-full px-3 py-2 border border-gray-300 shadow-sm rounded-sm `}
              />
              {errors.jobType && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.jobType?.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-medium">Skills</label>
              <input
                id="skills"
                type="text"
                {...register("skills", {
                  required: "Skills are required",
                })}
                placeholder="Skills"
                className={` mt-3 w-full px-3 py-2 border  border-gray-300 shadow-sm rounded-sm`}
              />
              {errors.skills && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.skills?.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-medium">Experience Level</label>
              <input
                id="experienceLevel"
                type="text"
                {...register("experienceLevel", {
                  required: "Experience Level is required",
                })}
                placeholder="Experience Level"
                className={`mt-3 w-full px-3 py-2 border border-gray-300 shadow-sm rounded-sm `}
              />
              {errors.experienceLevel && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.experienceLevel?.message}
                </p>
              )}
            </div>

            <div>
              <label className="font-medium">Job Location</label>
              <input
                id="jobLocation"
                type="text"
                {...register("jobLocation", {
                  required: "Job Location is required",
                })}
                placeholder="Job Location"
                className={` mt-3 w-full px-3 py-2 border  border-gray-300 shadow-sm rounded-sm`}
              />
              {errors.jobLocation && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.jobLocation?.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-medium">Monthly Salary</label>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <input
                  id="Minsalary"
                  type="number"
                  {...register("Minsalary", {
                    required: "Minimum Salary is required",
                  })}
                  placeholder="Min Salary"
                  className="p-3 border rounded-sm w-full"
                />
                {errors.Minsalary && (
                  <p className=" mt-2  px-1 text-sm text-red-600">
                    {errors.Minsalary?.message}
                  </p>
                )}
                <input
                  id="Maxsalary"
                  type="number"
                  {...register("Maxsalary", {
                    required: "Maximum Salary is required",
                  })}
                  placeholder="Max Salary"
                  className="p-3 border rounded-sm w-full"
                />
                {errors.Maxsalary && (
                  <p className=" mt-2  px-1 text-sm text-red-600">
                    {errors.Maxsalary?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="font-medium">Application Deadline</label>
              <input
                id="applicationDeadline"
                type="date"
                {...register("applicationDeadline", {
                  required: "Application Deadline is required",
                })}
                className={` mt-3 w-full px-3 py-2 border  border-gray-300 shadow-sm rounded-sm`}
              />
              {errors.applicationDeadline && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.applicationDeadline?.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-medium">Vacancy</label>
              <input
                id="vacancy"
                type="number"
                {...register("vacancy", {
                  required: "Vacancy is required",
                })}
                placeholder="Vacancy"
                className={` mt-3 w-full px-3 py-2 border  border-gray-300 shadow-sm rounded-sm`}
              />
              {errors.vacancy && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.vacancy?.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-accent  rounded-sm">
          <h2 className="bg-gray-800 text-white font-bold rounded-sm px-4 py-4">
            Job Information
          </h2>
          <div className="grid grid-cols-1 mt-6 px-8 pb-8">
            <div>
              <label className="font-medium">Job Description</label>
              <textarea
                id="jobDescription"
                {...register("jobDescription", {
                  required: "Job Description is required",
                })}
                placeholder="Job Description"
                className={` mt-3 w-full px-3 py-2 border resize-none border-gray-300 shadow-sm rounded-sm h-32`}
              />
              {errors.jobDescription && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.jobDescription?.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-medium">Job Responsibilities</label>
              <textarea
                id="JobResponsibilities"
                {...register("JobResponsibilities", {
                  required: "Job Responsibilities is required",
                })}
                placeholder="Job Responsibilities"
                className={` mt-3 w-full px-3 py-2 border resize-none  border-gray-300 shadow-sm rounded-sm h-32`}
              />
              {errors.JobResponsibilities && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.JobResponsibilities?.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-medium">Educational Requirements</label>
              <textarea
                id="educationalRequirements"
                {...register("educationalRequirements", {
                  required: "Educational Requirements is required",
                })}
                placeholder="Educational Requirements"
                className={` mt-3 w-full resize-none px-3 py-2 border  border-gray-300 shadow-sm rounded-sm h-32`}
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
                {...register("benefits", {
                  required: "Benefits is required",
                })}
                placeholder="Benefits"
                className={` mt-3 w-full px-3 py-2 border resize-none  border-gray-300 shadow-sm rounded-sm h-32`}
              />
              {errors.benefits && (
                <p className=" mt-2  px-1 text-sm text-red-600">
                  {errors.benefits?.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          className=" group flex items-center justify-center border mt-8 px-3 py-2 w-full bg-[#FF8A00] font-bold text-md cursor-pointer text-white"
          type="submit"
        >
          <span className="transition duration-300 group-hover:-translate-x-2">
            Submit jobs
          </span>
          <span className="w-5 h-5 opacity-0  group-hover:opacity-100  group-hover:translate-x-2 transition duration-300">
            <ChevronRight size={20} />
          </span>
        </button>
      </form>
    </div>
  );
};

export default JobPost;
