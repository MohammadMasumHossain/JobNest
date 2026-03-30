import { useState, useMemo } from "react";
import { BeatLoader } from "react-spinners";

import ReactPaginate from "react-paginate";
import {
  ArrowUpDown,
  ArrowUpRight,
  Banknote,
  Clock4,
  Filter,
  Hourglass,
  LocateFixed,
  MoreVertical,
  Plus,
  Search,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import CustomDropDownMenu from "@/components/CustomDropDownMenu";

import JobDetailsModal from "./JobDetailsModal";
import { useNavigate } from "react-router";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

type JobData = {
  _id: string;

  jobcategory: string;
  companyname: string;
  jobLocation: string;
  jobType: string;

  Minsalary: number;
  Maxsalary: number;
  vacancy: number;
  experienceLevel: string;
  status: string;
  postedDate: string;
  jobDescription: string;
  educationalRequirements: string[];
  JobResponsibilities: string[];
  benefits: string[];
};

const sortOptions = [
  "Latest",
  "Salary: High → Low",
  "Salary: Low → High",
  "Approved",
  "Pending",
];

const JobListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const [jobTypeFilter, setJobTypeFilter] = useState<string>("All");
  const [sortOption, setSortOption] = useState<string>(sortOptions[0]);

  const [selectedJob, setSelectedJob] = useState<JobData | null>(null);

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const navigate = useNavigate();
  const itemsPerPage = 6;

  const queryClient = useQueryClient();

  const {
    data: jobs = [],
    isLoading,
    isError,
  } = useQuery<JobData[]>({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/jobs");
      return res.data;
    },
  });

  const jobTypes: string[] = [
    "All",
    ...Array.from(new Set(jobs.map((job: JobData) => job.jobType))),
  ];

  const getMinSalary = (job: JobData) => job.Minsalary;
  const getMaxSalary = (job: JobData) => job.Maxsalary;

  const filteredJobs = useMemo(() => {
    let filtered = jobs.filter(
      (job: JobData) =>
        (job.jobcategory ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (job.companyname ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
    );

    if (jobTypeFilter !== "All") {
      filtered = filtered.filter(
        (job: JobData) =>
          job.jobType.toLowerCase() === jobTypeFilter.toLowerCase(),
      );
    }
    if (sortOption === "Approved") {
      filtered = filtered.filter(
        (job: JobData) => job.status.toLowerCase() === "approved",
      );
    } else if (sortOption === "Pending") {
      filtered = filtered.filter(
        (job: JobData) => job.status.toLowerCase() === "pending",
      );
    }

    if (sortOption === "Salary: High → Low") {
      filtered.sort(
        (a: JobData, b: JobData) => getMaxSalary(b) - getMaxSalary(a),
      );
    } else if (sortOption === "Salary: Low → High") {
      filtered.sort(
        (a: JobData, b: JobData) => getMinSalary(a) - getMinSalary(b),
      );
    } else if (sortOption === "Latest") {
      filtered.sort(
        (a: JobData, b: JobData) =>
          new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime(),
      );
    }

    return filtered;
  }, [jobs, searchTerm, jobTypeFilter, sortOption]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh] ">
        <BeatLoader color="#f97316" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg text-red-500">Failed to load Jobs</p>
      </div>
    );
  }

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredJobs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredJobs.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % filteredJobs.length;
    setItemOffset(newOffset);
  };

  const openDetailsModal = (job: JobData) => {
    setSelectedJob(job);
    setDetailsModalOpen(true);
  };

  return (
    <div className=" mt-4 md:mt-0 md:p-6 lg:p-0 min-h-screen">
      <Toaster position="bottom-right" />

      <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl mt-8 md:mt-0 font-bold text-gray-800">
          Explore Job Opportunities
        </h1>
        <div className="px-1">
          <button
            onClick={() => navigate("/dashboard/jobpost")}
            className="flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 lg:px-8 py-3 w-full sm:w-auto md:w-auto text-sm sm:text-base md:text-base lg:text-lg cursor-pointer 
      bg-orange-500 text-white 
      font-semibold rounded-md 
      shadow-lg 
      hover:bg-orange-600 
      transition transform hover:-translate-y-0.5
    "
          >
            <Plus size={20} />
            <p>Job Post</p>
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-md p-6 mb-10 border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="relative w-full lg:w-1/3">
            <Search size={18} className="absolute top-4 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search job title or company..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md
                focus:ring-1 focus:ring-orange-400 focus:bg-white transition outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex justify-between lg:justify-end space-x-4">
            <div className="w-48">
              <CustomDropDownMenu
                options={jobTypes}
                selected={jobTypeFilter}
                onSelect={setJobTypeFilter}
                rotateIcon={false}
                icon={<Filter className="w-6 h-6" />}
              />
            </div>

            <div className="w-48">
              <CustomDropDownMenu
                options={sortOptions}
                selected={sortOption}
                onSelect={setSortOption}
                rotateIcon={false}
                icon={<ArrowUpDown className="w-6 h-6" />}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.length === 0 ? (
          <div className="col-span-full flex items-center justify-center h-[50vh] sm:h-[60vh] md:h-[70vh]">
            <p className="text-center text-gray-500 text-lg sm:text-xl md:text-2xl">
              No job opportunities found. Please try a different search or
              filter.
            </p>
          </div>
        ) : (
          currentItems.map((job: JobData) => (
            <div
              key={job._id}
              onClick={() => openDetailsModal(job)}
              className="group bg-white rounded-2xl p-6 border border-gray-200
                hover:border-orange-400 hover:shadow-2xl
                transition-all duration-300 cursor-pointer
                flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition">
                      {job.jobcategory}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {job.companyname}
                    </p>
                  </div>

                  {/* <div className="flex items-center gap-2">
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        job.jobType === "Full-Time"
                          ? "bg-orange-100 text-orange-500"
                          : job.jobType === "Contract"
                            ? "bg-green-200 text-green-700"
                            : job.jobType === "Part-Time"
                              ? "bg-red-200 text-red-700"
                              : "bg-blue-200 text-blue-700"
                      }`}
                    >
                      {job.jobType}
                    </div>
                    <button
                      className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();

                        navigate(`/dashboard/jobEditPage/${job._id}`, {
                          state: { jobData: job },
                        });
                      }}
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div> */}
                  <div className="flex items-center gap-2 relative">
                    {/* Job type badge */}
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        job.jobType === "Full-Time"
                          ? "bg-orange-100 text-orange-500"
                          : job.jobType === "Contract"
                            ? "bg-green-200 text-green-700"
                            : job.jobType === "Part-Time"
                              ? "bg-red-200 text-red-700"
                              : "bg-blue-200 text-blue-700"
                      }`}
                    >
                      {job.jobType}
                    </div>

                    {/* Three-dot menu */}
                    <div className="relative">
                      <button
                        className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId((prev) =>
                            prev === job._id ? null : job._id,
                          );
                        }}
                      >
                        <MoreVertical size={16} />
                      </button>

                      {/* Dropdown menu */}
                      {openDropdownId === job._id && (
                        <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded shadow-lg z-10">
                          <button
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/dashboard/jobEditPage/${job._id}`, {
                                state: { jobData: job },
                              });
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            onClick={async (e) => {
                              e.stopPropagation();
                              try {
                                await axiosInstance.delete(`/job/${job._id}`);
                                toast.success("Job deleted successfully!");
                                queryClient.invalidateQueries({
                                  queryKey: ["jobs"],
                                });
                              } catch (err) {
                                toast.error("Failed to delete job.");
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Banknote size={16} className="text-orange-500" />
                    <span>
                      {job.Minsalary}-{job.Maxsalary}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock4 size={16} className="text-orange-500" />
                    <span>{job.experienceLevel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LocateFixed size={16} className="text-orange-500" />
                    <span>{job.jobLocation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hourglass size={16} className="text-orange-500" />
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        job.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : job.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-500"
                      }`}
                    >
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Posted: {job.postedDate}
                </span>
                <div
                  className="w-9 h-9 flex items-center justify-center
                    rounded-lg bg-gray-100 group-hover:bg-orange-500
                    group-hover:text-white transition"
                >
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:rotate-45"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-10 flex justify-center">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={12}
          pageCount={pageCount}
          previousLabel="Previous"
          renderOnZeroPageCount={null}
          containerClassName="flex justify-center gap-4 mt-2 md:mt-6 lg:mt-8 select-none"
          pageClassName="border rounded"
          pageLinkClassName="px-3 py-1 block cursor-pointer"
          activeClassName="bg-orange-600 text-white"
          previousClassName="border rounded"
          previousLinkClassName="px-3 py-1 block cursor-pointer"
          nextClassName="border rounded"
          nextLinkClassName="px-3 py-1 block cursor-pointer"
          disabledClassName="opacity-60 cursor-not-allowed"
        />
      </div>

      <JobDetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        job={selectedJob}
        onConfirm={() => toast.success("You confirmed this job!")}
        onReject={() => toast.error("You rejected this job!")}
      />
    </div>
  );
};

export default JobListing;
