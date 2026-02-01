import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import mockData from "./data.json";
import {
  LocationEdit,
  Mail,
  PersonStanding,
  Phone,
  User2,
  type User,
} from "lucide-react";
import { useState } from "react";

type User = {
  id: number;

  Email: string;
  location: string;
  role: string;
  phone: string;
};

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center hover:text-orange-600">
        <User2 className="mr-2" size={20} />
        ID
      </span>
    ),
  }),

  columnHelper.accessor("Email", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center  hover:text-orange-600">
        <Mail className="mr-2" size={20} />
        Email
      </span>
    ),
  }),
  columnHelper.accessor("location", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center hover:text-orange-600">
        <LocationEdit className="mr-2" size={20} />
        Location
      </span>
    ),
  }),
  columnHelper.accessor("role", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center hover:text-orange-600">
        <PersonStanding className="mr-2" size={20} />
        Role
      </span>
    ),
  }),
  columnHelper.accessor("phone", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center hover:text-orange-600">
        <Phone className="mr-2" size={20} />
        Phone
      </span>
    ),
  }),
];

const ManageUser = () => {
  const [data] = useState(() => [...mockData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(table.getRowModel().rows[0].getVisibleCells());
  return (
    <div className="flex flex-col min-h-screen max-w-8xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="overflow-x-auto bg-white rounded-md shadow-md">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-secondary">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-10 py-4 text-left text-md font-medium text-white uppercase"
                  >
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-10 py-4 whitespace-nowrap text-sm text-gray-700"
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

export default ManageUser;

{
  /* <table className="w-full border-collapse ">
  <thead>
    {table.getHeaderGroups().map((headerGroup) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <th key={header.id} className="">
            <div>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </div>
          </th>
        ))}
      </tr>
    ))}
  </thead>
  {/* <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-gray-300 p-2">
                  {cell.getValue()}
                </td>
              ))}
            </tr>
          ))}
        </tbody> */
}
// </table>; */}
