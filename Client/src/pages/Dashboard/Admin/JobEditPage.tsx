import { ChevronDown, ChevronRight, CalendarDays } from "lucide-react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import CustomCalender from "@/components/CustomCalender";
import CustomDropDown from "@/components/CustomDropDownMenu";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";

type Inputs = {
  companyname: string;
  jobcategory: string;
  jobType: string;
  jobLocation: string;
  experienceLevel: string;
  Minsalary: number | string;
  Maxsalary: number | string;
  applicationDeadline: string;
  vacancy: number | string;
  jobDescription: string;
  JobResponsibilities: string[];
  educationalRequirements: string[];
  benefits: string[];
};

const JobEditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const jobData = location.state?.jobData as
    | (Inputs & { _id: string })
    | undefined;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: jobData ?? {},
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    if (!jobData) return;

    // set date picker
    if (jobData.applicationDeadline) {
      const date = new Date(jobData.applicationDeadline);
      setSelectedDate(date);
      setValue("applicationDeadline", jobData.applicationDeadline);
    }
  }, [jobData, setValue]);

  const jobTypeOptions = ["FullTime", "PartTime"];
  const jobTitleOptions = [
    "Frontend Developer",
    "Engineering",
    "Data Science",
    "Business Analyst",
    "UI/UX Design",
    "Video Editing",
    "Finance & Accounting",
  ];
  const experienceLevelOptions = [
    "Fresher",
    "1-2 Years",
    "2-3 Years",
    "3-4 Years",
  ];

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!jobData?._id) {
      toast.error("Job ID missing");
      return;
    }

    const payload = {
      companyname: data.companyname,
      jobcategory: data.jobcategory,
      jobType: data.jobType,
      jobLocation: data.jobLocation,
      experienceLevel: data.experienceLevel,
      Minsalary: Number(data.Minsalary),
      Maxsalary: Number(data.Maxsalary),
      vacancy: Number(data.vacancy),
      jobDescription: data.jobDescription,
      jobResponsibilities:
        data.JobResponsibilities?.filter((r) => r.trim() !== "") || [],
      requirements:
        data.educationalRequirements?.filter((r) => r.trim() !== "") || [],
      benefits: data.benefits?.filter((r) => r.trim() !== "") || [],
      applicationDeadline: selectedDate
        ? selectedDate.toISOString().split("T")[0] // YYYY-MM-DD
        : data.applicationDeadline,
    };
    try {
      await axiosInstance.patch(`/job/${jobData._id}`, payload);
      toast.success("Job updated successfully!");
      setTimeout(() => navigate("/dashboard/joblisting"), 800);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update job.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-accent mt-10 md:mt-0 mb-10 rounded-sm">
          <h2 className="bg-gray-800 text-white font-bold px-4 py-4">
            Job Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 px-8 pb-8">
            {/* Company Name */}
            <div>
              <label className="font-medium">Company Name *</label>
              <input
                type="text"
                {...register("companyname", {
                  required: "Company is required",
                })}
                className="mt-1 w-full px-3 py-2 border rounded-sm"
              />
              {errors.companyname && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.companyname.message}
                </p>
              )}
            </div>

            {/* Job Title */}
            <div>
              <label className="font-medium">Job Title *</label>
              <Controller
                name="jobcategory"
                control={control}
                defaultValue={jobData?.jobcategory || ""}
                render={({ field }) => (
                  <CustomDropDown
                    options={jobTitleOptions}
                    selected={field.value}
                    onSelect={field.onChange}
                    icon={<ChevronDown />}
                  />
                )}
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="font-medium">Job Type *</label>
              <Controller
                name="jobType"
                control={control}
                defaultValue={jobData?.jobType || ""}
                render={({ field }) => (
                  <CustomDropDown
                    options={jobTypeOptions}
                    selected={field.value}
                    onSelect={field.onChange}
                    icon={<ChevronDown />}
                  />
                )}
              />
            </div>

            {/* Experience */}
            <div>
              <label className="font-medium">Experience Level *</label>
              <Controller
                name="experienceLevel"
                control={control}
                defaultValue={jobData?.experienceLevel || ""}
                render={({ field }) => (
                  <CustomDropDown
                    options={experienceLevelOptions}
                    selected={field.value}
                    onSelect={field.onChange}
                    icon={<ChevronDown />}
                  />
                )}
              />
            </div>

            {/* Location */}
            <div>
              <label className="font-medium">Location *</label>
              <input
                type="text"
                {...register("jobLocation", {
                  required: "Location is required",
                })}
                className="mt-1 w-full px-3 py-2 border rounded-sm"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="font-medium">Salary *</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  {...register("Minsalary", { required: true })}
                  placeholder="Min"
                  className="mt-1 px-3 py-2 border rounded-sm"
                />
                <input
                  type="number"
                  {...register("Maxsalary", { required: true })}
                  placeholder="Max"
                  className="mt-1 px-3 py-2 border rounded-sm"
                />
              </div>
            </div>

            {/* Deadline */}
            <div className="relative">
              <label className="font-medium">Application Deadline *</label>
              <div
                onClick={() => setShowCalendar(true)}
                className="mt-1 w-full flex justify-between items-center px-3 py-2 border rounded-sm bg-white cursor-pointer"
              >
                <span>
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
                        setValue("applicationDeadline", date.toISOString(), {
                          shouldValidate: true,
                        });
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
            </div>

            {/* Vacancy */}
            <div>
              <label className="font-medium">Vacancy</label>
              <input
                type="number"
                {...register("vacancy")}
                className="mt-1 w-full px-3 py-2 border rounded-sm"
              />
            </div>
          </div>

          {/* Text Sections */}
          <div className="grid grid-cols-1 px-8 pb-4 gap-4">
            <div>
              <label className="font-medium">Job Description *</label>
              <textarea
                {...register("jobDescription")}
                className="mt-1 w-full px-3 py-2 border rounded-sm h-32"
              />
            </div>

            {/* Job Responsibilities */}
            <div>
              <label className="font-medium">Job Responsibilities *</label>
              <Controller
                name="JobResponsibilities"
                control={control}
                defaultValue={jobData?.JobResponsibilities || []}
                render={({ field }) => (
                  <textarea
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.split("\n"))}
                    value={field.value.join("\n")}
                    className="mt-1 w-full px-3 py-2 border rounded-sm h-32"
                  />
                )}
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="font-medium">Requirements *</label>
              <Controller
                name="educationalRequirements"
                control={control}
                defaultValue={jobData?.educationalRequirements || []}
                render={({ field }) => (
                  <textarea
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.split("\n"))}
                    value={field.value.join("\n")}
                    className="mt-1 w-full px-3 py-2 border rounded-sm h-32"
                  />
                )}
              />
            </div>

            {/* Benefits */}
            <div>
              <label className="font-medium">Benefits</label>
              <Controller
                name="benefits"
                control={control}
                defaultValue={jobData?.benefits || []}
                render={({ field }) => (
                  <textarea
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.split("\n"))}
                    value={field.value.join("\n")}
                    className="mt-1 w-full px-3 py-2 border rounded-sm h-32"
                  />
                )}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="group relative flex mx-auto justify-center items-center border mt-8 px-3 rounded-md py-2 w-40 bg-orange-500 font-bold text-md cursor-pointer overflow-hidden text-white"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-3">
            Update Job
          </span>
          <span className="absolute opacity-0 transform transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-10">
            <ChevronRight size={20} />
          </span>
        </button>
      </form>
    </div>
  );
};

export default JobEditPage;
