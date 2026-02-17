// import {
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { createColumnHelper } from "@tanstack/react-table";
// import jobListData from "./jobList.json";
// import { useState } from "react";

// type jobData = {
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

// const columnHelper = createColumnHelper<jobData>();

// const columns = [
//   columnHelper.accessor("id", {
//     cell: (info) => info.getValue(),
//     header: () => (
//       <span className="flex items-center hover:text-orange-600">ID</span>
//     ),
//   }),

//   columnHelper.accessor("jobTitle", {
//     cell: (info) => info.getValue(),
//     header: () => (
//       <span className="flex items-center  hover:text-orange-600">
//         Job Title
//       </span>
//     ),
//   }),
//   columnHelper.accessor("company", {
//     cell: (info) => info.getValue(),
//     header: () => (
//       <span className="flex items-center hover:text-orange-600">Company</span>
//     ),
//   }),
//   columnHelper.accessor("location", {
//     cell: (info) => info.getValue(),
//     header: () => (
//       <span className="flex items-center hover:text-orange-600">Location</span>
//     ),
//   }),
//   columnHelper.accessor("jobType", {
//     cell: (info) => info.getValue(),
//     header: () => (
//       <span className="flex items-center hover:text-orange-600">Job Type</span>
//     ),
//   }),
//   columnHelper.accessor("salary", {
//     cell: (info) => info.getValue(),
//     header: () => (
//       <span className="flex items-center hover:text-orange-600">Salary</span>
//     ),
//   }),
//   columnHelper.accessor("experience", {
//     cell: (info) => info.getValue(),
//     header: () => (
//       <span className="flex items-center hover:text-orange-600">
//         Experience
//       </span>
//     ),
//   }),
//   columnHelper.accessor("status", {
//     cell: (info) => info.getValue(),
//     header: () => (
//       <span className="flex items-center hover:text-orange-600">Status</span>
//     ),
//   }),
//   columnHelper.accessor("postedDate", {
//     cell: (info) => info.getValue(),
//     header: () => (
//       <span className="flex items-center hover:text-orange-600">
//         Posted Date
//       </span>
//     ),
//   }),
// ];

// const JobListing = () => {
//   const [data] = useState(() => jobListData);
//   const table = useReactTable({
//     data,
//     columns,

//     getCoreRowModel: getCoreRowModel(),
//   });
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4 ml-2">Job Listings...</h1>
//       <div className="rounded-lg overflow-x-auto shadow-md">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead className="bg-secondary ">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th
//                     key={header.id}
//                     className="py-6 px-8  border-b border-gray-200 text-center text-sm font-semibold text-white"
//                   >
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext(),
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {table.getRowModel().rows.map((row) => (
//               <tr key={row.id} className="hover:bg-gray-50">
//                 {row.getVisibleCells().map((cell) => (
//                   <td
//                     key={cell.id}
//                     className="py-6 px-8  border-b border-gray-200 text-sm text-gray-700"
//                   >
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default JobListing;

// pages/Dashboard/Admin/JobListing.tsx
import { useState } from "react";

import jobListData from "./jobList.json";
import { useNavigate } from "react-router";
import {
  ArrowUpRight,
  Banknote,
  Briefcase,
  Clock4,
  LocateFixed,
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
  const [jobs] = useState(jobListData);
  const navigate = useNavigate();

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Job Listings</h1>

      <div className="grid grid-cols-1 w-[70%] mx-auto space-y-4 ">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="group bg-white border border-gray-200 rounded-2xl overflow-hidden 
                       shadow-md hover:shadow-xl hover:border-orange-400 
                     hover:bg-orange-50 transition-all duration-300 cursor-pointer"
            onClick={() => navigate(`/dashboard/job/${job.id}`)}
          >
            <div className="flex justify-between items-center">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition">
                  {job.company}
                </h2>

                <p className="text-gray-500 group-hover:text-orange-600 transition mt-3">
                  {job.jobTitle}
                </p>

                <div className="flex flex-wrap gap-3 mt-5 text-gray-600 text-sm">
                  <span className="px-2 py-1 border flex space-x-2 items-center bg-gray-100 rounded-md">
                    <div className="text-orange-600">
                      <Banknote size={16} />
                    </div>
                    <div> {job.salary}</div>
                  </span>
                  <span className="px-2 py-1 border flex space-x-2 items-center bg-gray-100 rounded-md">
                    <div className="text-orange-600">
                      <Clock4 size={16} />
                    </div>
                    <div>{job.experience}</div>
                  </span>
                  <span className="px-2 py-1 border flex space-x-2 items-center bg-gray-100 rounded-md">
                    <div className="text-orange-600">
                      <Briefcase size={16} />
                    </div>
                    <div>{job.jobType}</div>
                  </span>
                  <span className="px-2 py-1 border flex space-x-2 items-center bg-gray-100 rounded-md">
                    <div className="text-orange-500">
                      <LocateFixed size={16} />
                    </div>
                    <div>{job.location}</div>
                  </span>
                </div>
              </div>

              <div className="group pr-6">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-lg 
                 bg-gray-100 group-hover:bg-orange-500 
                 group-hover:text-white transition"
                >
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:rotate-45"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListing;
