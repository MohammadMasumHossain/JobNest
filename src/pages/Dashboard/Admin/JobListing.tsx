import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import jobListData from "./jobList.json";
import { useState } from "react";

type jobData = {
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

const columnHelper = createColumnHelper<jobData>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center hover:text-orange-600">ID</span>
    ),
  }),

  columnHelper.accessor("jobTitle", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center  hover:text-orange-600">
        Job Title
      </span>
    ),
  }),
  columnHelper.accessor("company", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center hover:text-orange-600">Company</span>
    ),
  }),
  columnHelper.accessor("location", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center hover:text-orange-600">Location</span>
    ),
  }),
  columnHelper.accessor("jobType", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center hover:text-orange-600">Job Type</span>
    ),
  }),
  columnHelper.accessor("salary", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center hover:text-orange-600">Salary</span>
    ),
  }),
  columnHelper.accessor("experience", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center hover:text-orange-600">
        Experience
      </span>
    ),
  }),
  columnHelper.accessor("status", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center hover:text-orange-600">Status</span>
    ),
  }),
  columnHelper.accessor("postedDate", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center hover:text-orange-600">
        Posted Date
      </span>
    ),
  }),
];

const JobListing = () => {
  const [data] = useState(() => jobListData);
  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 ml-2">Job Listings...</h1>
      <div className="rounded-lg overflow-x-auto shadow-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-secondary ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-6 px-8  border-b border-gray-200 text-center text-sm font-semibold text-white"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-6 px-8  border-b border-gray-200 text-sm text-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobListing;
