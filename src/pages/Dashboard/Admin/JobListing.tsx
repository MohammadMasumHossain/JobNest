import { useState, useMemo } from "react";
import jobListData from "./jobList.json";
import ReactPaginate from "react-paginate";
import {
  ArrowUpDown,
  ArrowUpRight,
  Banknote,
  Briefcase,
  Clock4,
  Filter,
  LocateFixed,
  Search,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import Button from "@/components/ui/Button";
import CustomDropDownMenu from "@/components/ui/CustomDropDownMenu";

import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";
import JobDetailsModal from "./JobDetailsModal";
import { useNavigate } from "react-router";

type JobData = {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  jobType: string;
  salary: string;
  experience: string;
  status: string;
  postedDate: string;
  jobDescription: string;
  requirements: string[];
  jobResponsibilities: string[];
  benefits: string[];
};

const sortOptions = ["Latest", "Salary: High → Low", "Salary: Low → High"];

const JobListing = () => {
  const [jobs, setJobs] = useState<JobData[]>(jobListData);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const [jobTypeFilter, setJobTypeFilter] = useState<string>("All");
  const [sortOption, setSortOption] = useState<string>(sortOptions[0]);

  const [selectedJob, setSelectedJob] = useState<JobData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const navigate = useNavigate();
  const itemsPerPage = 6;

  const jobTypes = [
    "All",
    ...Array.from(new Set(jobs.map((job) => job.jobType))),
  ];

  const getMinSalary = (salary: string) =>
    parseInt(salary.split("-")[0].replace(/,/g, "").trim());

  const filteredJobs = useMemo(() => {
    let filtered = jobs.filter(
      (job) =>
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (jobTypeFilter !== "All") {
      filtered = filtered.filter(
        (job) => job.jobType.toLowerCase() === jobTypeFilter.toLowerCase(),
      );
    }

    if (sortOption === "Salary: High → Low") {
      filtered.sort((a, b) => getMinSalary(b.salary) - getMinSalary(a.salary));
    } else if (sortOption === "Salary: Low → High") {
      filtered.sort((a, b) => getMinSalary(a.salary) - getMinSalary(b.salary));
    } else if (sortOption === "Latest") {
      filtered.sort(
        (a, b) =>
          new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime(),
      );
    }

    return filtered;
  }, [jobs, searchTerm, jobTypeFilter, sortOption]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredJobs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredJobs.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % filteredJobs.length;
    setItemOffset(newOffset);
  };

  const openJobModal = (job: JobData) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const handleConfirm = () => {
    toast.success("You confirmed this job!");
  };

  const handleDelete = () => setConfirmDeleteOpen(true);

  const handleDeleteConfirm = () => {
    if (selectedJob) {
      setJobs(jobs.filter((job) => job.id !== selectedJob.id));
      toast.success("Job deleted successfully!");
      setModalOpen(false);
    }
    setConfirmDeleteOpen(false);
  };

  return (
    <div className="p-2  md:p-6 lg:p-0  min-h-screen">
      <Toaster position="bottom-right" />

      <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
        <h1 className=" text-2xl md:text-3xl mt-8 md:mt-0 font-bold text-gray-800">
          Explore Job Opportunities
        </h1>
        <div className="-mt-8 px-1">
          <Button
            className=" text-bold text-md md:text-bold md:text-lg py-3 text-center"
            label="Job Post"
            onClick={() => navigate("/dashboard/jobpost")}
          />
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
          currentItems.map((job) => (
            <div
              key={job.id}
              onClick={() => openJobModal(job)}
              className="group bg-white rounded-2xl p-6 border border-gray-200
              hover:border-orange-400 hover:shadow-2xl
              transition-all duration-300 cursor-pointer
              flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition">
                      {job.jobTitle}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">{job.company}</p>
                  </div>
                  <span className="text-xs px-3 py-1 text-center bg-orange-100 text-orange-600 rounded-full">
                    {job.jobType}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Banknote size={16} className="text-orange-500" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock4 size={16} className="text-orange-500" />
                    <span>{job.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LocateFixed size={16} className="text-orange-500" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} className="text-orange-500" />
                    <span>{job.status}</span>
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
        open={modalOpen}
        onOpenChange={setModalOpen}
        job={selectedJob}
        onConfirm={handleConfirm}
        onDelete={handleDelete}
      />

      <ConfirmDeleteModal
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default JobListing;
