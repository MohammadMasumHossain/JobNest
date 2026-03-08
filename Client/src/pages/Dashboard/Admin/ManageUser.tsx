import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import mockData from "./data.json";

import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  LocationEdit,
  Mail,
  PersonStanding,
  Phone,
  Search,
  User2,
} from "lucide-react";
import { useState } from "react";
import CreateUser from "./CreateUser";
import EditUser, { type EditUserForm } from "./EditUser";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import { toast, Toaster } from "react-hot-toast";

type UserType = {
  id: number;
  Email: string;
  location: string;
  role: string;
  phone: string;
};

const ManageUser = () => {
  const [data, setData] = useState<UserType[]>(() => [...mockData]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  const columnHelper = createColumnHelper<UserType>();

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((user) => user.id !== id));
    toast.success("User deleted successfully!");
  };

  const handleEdit = (updated: EditUserForm) => {
    setData((prev) =>
      prev.map((user) =>
        user.id === updated.id
          ? {
              ...user,
              Email: updated.email,
              role: updated.role,
              location: updated.location,
              phone: updated.phone,
            }
          : user,
      ),
    );
    toast.success("User updated successfully!");
    setEditingUser(null);
  };

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
        <span className="flex items-center hover:text-orange-600">
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
    columnHelper.display({
      id: "actions",
      header: () => (
        <span className="text-white uppercase font-medium text-sm">
          Actions
        </span>
      ),
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => setEditingUser(row.original)}
            className="px-3 w-20 py-1 cursor-pointer text-white bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Edit
          </button>
          <button
            onClick={() => setDeleteTarget(row.original.id)}
            className="px-3 w-20 py-1 cursor-pointer text-white bg-red-600 rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    initialState: { pagination: { pageSize: 10 } },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col min-h-screen max-w-8xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Toaster position="bottom-right" reverseOrder={false} />

      <h1 className="text-2xl md:text-3xl font-bold  text-gray-800 pt-4 md:pt-0  mb-4 md:mb-6">
        Manage Users
      </h1>

      <div className="bg-gray-800 rounded-md px-4 py-4 flex flex-col sm:flex-col md:flex-row justify-between items-center mb-8 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        <div className="relative w-full sm:w-full md:flex-1 md:max-w-md lg:max-w-lg">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm placeholder-white focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition text-sm sm:text-base md:text-base lg:text-lg"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <Search
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white"
            size={20}
          />
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 lg:px-8 py-3 w-full sm:w-auto md:w-auto text-sm sm:text-base md:text-base lg:text-lg cursor-pointer 
      bg-orange-500 text-white 
      font-semibold rounded-md 
      shadow-lg 
      hover:bg-orange-600 
      transition transform hover:-translate-y-0.5
    "
        >
          <User2 size={20} />
          Create User
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-md shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-10 py-4 text-left text-md font-medium text-white uppercase"
                  >
                    <div
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer hover:text-orange-500 select-none flex items-center"
                          : ""
                      }
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {header.column.getCanSort() && (
                        <ArrowUpDown className="ml-2" size={16} />
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
                    className="px-10 py-5 whitespace-nowrap text-sm text-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-4 text-sm text-gray-700">
        <div className="flex bg-white px-2 py-1 rounded-md items-center mb-4 mt-4 space-x-4">
          <span className="ml-2">Items per page</span>
          <select
            className="border border-gray-300 rounded-md shadow-sm cursor-pointer focus:ring-orange-500 focus:border-orange-500 p-2"
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[5, 10, 15].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center rounded-md px-2 py-1 bg-white space-x-2">
          <button
            className="p-2 rounded-md text-gray-600 cursor-pointer hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft size={20} />
          </button>
          <button
            className="p-2 rounded-md text-gray-600 cursor-pointer hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={20} />
          </button>

          <span className="flex items-center">
            <input
              value={table.getState().pagination.pageIndex + 1}
              className="w-12 p-1 border border-gray-300 cursor-pointer rounded-md text-center"
            />
            <span className="ml-1">of {table.getPageCount()}</span>
          </span>

          <button
            className="p-2 rounded-md text-gray-600 cursor-pointer hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={20} />
          </button>
          <button
            className="p-2 rounded-md text-gray-600 cursor-pointer hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight size={20} />
          </button>
        </div>
      </div>

      {deleteTarget !== null && (
        <ConfirmDeleteModal
          open={deleteTarget !== null}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => {
            handleDelete(deleteTarget);
            setDeleteTarget(null);
          }}
        />
      )}

      {isCreateOpen && <CreateUser onClose={() => setIsCreateOpen(false)} />}

      {editingUser && (
        <EditUser
          open={true}
          user={{
            id: editingUser.id,
            email: editingUser.Email,
            role: editingUser.role,
            location: editingUser.location,
            phone: editingUser.phone,
          }}
          onClose={() => setEditingUser(null)}
          onUpdate={handleEdit}
        />
      )}
    </div>
  );
};

export default ManageUser;
