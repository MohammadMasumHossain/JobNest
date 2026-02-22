// import { useState } from "react";

// import jobListData from "./jobList.json";
// import { useNavigate } from "react-router";
// import {
//   ArrowUpRight,
//   Banknote,
//   Briefcase,
//   Clock4,
//   LocateFixed,
// } from "lucide-react";

// type JobData = {
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

// const JobListing = () => {
//   const [jobs] = useState(jobListData);
//   const navigate = useNavigate();

//   return (
//     <div className="p-6  min-h-screen">
//       <h1 className="text-3xl font-bold mb-8 text-gray-800">Job Listings</h1>

//        <div>

//        </div>

//       <div className="grid grid-cols-2 gap-4 w-[95%] mx-auto space-y-2 ">
//         {jobs.map((job) => (
//           <div
//             key={job.id}
//             className="group bg-white border border-gray-200 rounded-2xl overflow-hidden
//                        shadow-md hover:shadow-xl hover:border-orange-400
//                      hover:bg-orange-50 transition-all duration-300 cursor-pointer"
//             onClick={() => navigate(`/dashboard/job/${job.id}`)}
//           >
//             <div className="flex justify-between items-center">
//               <div className="p-6">
//                 <h2 className="text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition">
//                   {job.company}
//                 </h2>

//                 <p className="text-gray-500 group-hover:text-orange-600 transition mt-3">
//                   {job.jobTitle}
//                 </p>

//                 <div className="flex gap-3 mt-5 text-gray-600 text-sm">
//                   <span className="px-2 py-1 border hover:border-orange-400 flex space-x-2 items-center bg-gray-100  rounded-md">
//                     <div className="text-orange-600">
//                       <Banknote size={16} />
//                     </div>
//                     <div> {job.salary}</div>
//                   </span>
//                   <span className="px-2 py-1 border hover:border-orange-400 flex space-x-2 items-center bg-gray-100 rounded-md">
//                     <div className="text-orange-600">
//                       <Clock4 size={16} />
//                     </div>
//                     <div>{job.experience}</div>
//                   </span>
//                   <span className="px-2 py-1 border hover:border-orange-400 flex space-x-2 items-center bg-gray-100 rounded-md">
//                     <div className="text-orange-600">
//                       <Briefcase size={16} />
//                     </div>
//                     <div>{job.jobType}</div>
//                   </span>
//                   <span className="px-2 py-1 border hover:border-orange-400 flex space-x-2 items-center bg-gray-100 rounded-md">
//                     <div className="text-orange-500">
//                       <LocateFixed size={16} />
//                     </div>
//                     <div>{job.location}</div>
//                   </span>
//                 </div>
//               </div>

//               <div className="group pr-6">
//                 <div
//                   className="w-10 h-10 flex items-center justify-center rounded-lg
//                  bg-gray-100 group-hover:bg-orange-500
//                  group-hover:text-white transition"
//                 >
//                   <ArrowUpRight
//                     size={18}
//                     className="transition-transform duration-300 group-hover:rotate-45"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JobListing;
import { useState, useMemo } from "react";
import jobListData from "./jobList.json";
import { useNavigate } from "react-router";
import ReactPaginate from "react-paginate";
import {
  ArrowUpRight,
  Banknote,
  Briefcase,
  Clock4,
  LocateFixed,
  Search,
} from "lucide-react";

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

const JobListing = () => {
  const [jobs] = useState<JobData[]>(jobListData);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("All");
  const [sortOption, setSortOption] = useState("latest");
  const [itemOffset, setItemOffset] = useState(0);

  const navigate = useNavigate();
  const itemsPerPage = 6;

  const jobTypes = ["All", ...new Set(jobs.map((job) => job.jobType))];

  const getMinSalary = (salary: string) => {
    return parseInt(salary.split("-")[0].replace(/,/g, "").trim());
  };

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

    if (sortOption === "salaryHigh") {
      filtered.sort((a, b) => getMinSalary(b.salary) - getMinSalary(a.salary));
    } else if (sortOption === "salaryLow") {
      filtered.sort((a, b) => getMinSalary(a.salary) - getMinSalary(b.salary));
    } else if (sortOption === "latest") {
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

  return (
    <div className="p-6 min-h-screen ">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Explore Job Opportunities
      </h1>

      <div className="bg-white shadow-md rounded-2xl p-6 mb-10 border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="relative w-full lg:w-1/3">
            <Search size={18} className="absolute top-4 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search job title or company..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
              focus:ring-2 focus:ring-orange-400 focus:bg-white transition outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 
            focus:ring-2 focus:ring-orange-400 focus:bg-white outline-none"
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
          >
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 
            focus:ring-2 focus:ring-orange-400 focus:bg-white outline-none"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="salaryHigh">Salary: High → Low</option>
            <option value="salaryLow">Salary: Low → High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((job) => (
          <div
            key={job.id}
            onClick={() => navigate(`/dashboard/job/${job.id}`)}
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

                <span className="text-xs px-3 py-1 bg-orange-100 text-orange-600 rounded-full">
                  {job.jobType}
                </span>
              </div>

              {/* Info */}
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
        ))}
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
          pageClassName=" border rounded"
          pageLinkClassName="px-3 py-1 block cursor-pointer"
          activeClassName="bg-orange-600 text-white"
          previousClassName=" border rounded"
          previousLinkClassName="px-3 py-1 block cursor-pointer"
          nextClassName=" border rounded"
          nextLinkClassName="px-3 py-1 block cursor-pointer"
          disabledClassName="opacity-60 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default JobListing;
