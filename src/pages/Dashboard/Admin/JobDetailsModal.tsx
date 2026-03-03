import React from "react";
import Button from "@/components/ui/Button";
import * as Dialog from "@radix-ui/react-dialog";
import { Briefcase, ClipboardList, FileText, Gift, X } from "lucide-react";

export type JobData = {
  id: string;
  jobTitle: string;
  vacancy: number;
  company: string;
  location: string;
  jobType: string;

  Minsalary: number;
  Maxsalary: number;
  experience: string;
  status: string;
  postedDate: string;
  jobDescription: string;
  requirements: string[];
  jobResponsibilities: string[];
  benefits: string[];
};

type JobDetailsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: JobData | null;
  onConfirm: () => void;
  onReject: () => void;
};

// const getStatusStyle = (status: string) => {
//   switch (status.toLowerCase()) {
//     case "approved":
//       return "bg-green-50 text-green-700 border-green-200";
//     case "rejected":
//       return "bg-red-50 text-red-700 border-red-200";
//     case "pending":
//       return "bg-yellow-50 text-yellow-700 border-yellow-200";
//     default:
//       return "bg-gray-50 text-gray-700 border-gray-200";
//   }
// };

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  open,
  onOpenChange,
  job,
  onReject,
  onConfirm,
}) => {
  if (!job) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-49" />

        <Dialog.Content
          className="
            fixed top-1/2 left-1/2 z-50
            w-[95%] sm:w-[85%] md:w-[70%]
            max-w-4xl
            max-h-[90vh]
            -translate-x-1/2 -translate-y-1/2
            bg-white rounded-md
            border border-gray-200
            flex flex-col
          "
        >
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <Dialog.Title className="text-2xl font-semibold text-gray-900">
                  {job.jobTitle}
                </Dialog.Title>
                <p className="text-gray-500 mt-1">
                  {job.company} • {job.location}
                </p>
              </div>

              <button
                onClick={() => onOpenChange(false)}
                className="p-2 cursor-pointer rounded-md hover:bg-gray-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mt-5">
              <span className="px-3 py-1 text-sm bg-gray-100 rounded-md">
                {job.jobType}
              </span>
              <span className="px-3 py-1 text-sm bg-gray-100 rounded-md">
                Salary : {job.Minsalary} - {job.Maxsalary}
              </span>

              <span className="px-3 py-1 text-sm bg-gray-100 rounded-md">
                {job.experience} experience
              </span>
              <span className="px-3 py-1 text-sm bg-gray-100 rounded-md">
                Vacancy : {job.vacancy}
              </span>
              <span className="px-3 py-1 text-sm bg-gray-100 rounded-md">
                {job.status}
              </span>
            </div>
          </div>

          <div className="overflow-y-auto px-8 py-6 space-y-8 text-gray-700">
            <section>
              <h3 className="flex items-center gap-2 text-lg font-medium text-gray-900 mb-3 group">
                <FileText
                  size={20}
                  className="text-orange-500 transition-transform duration-200 group-hover:scale-125"
                />
                Job Description
              </h3>

              <ul className="list-disc list-inside marker:text-orange-500 text-gray-600 space-y-2">
                <li>{job.jobDescription}</li>
              </ul>
            </section>

            <hr className="border-gray-200" />

            <section>
              <h3 className="flex items-center gap-2 text-lg font-medium text-gray-900 mb-3 group">
                <ClipboardList
                  size={20}
                  className="text-orange-500 transition-transform duration-200 group-hover:scale-125"
                />
                Educational Requirements
              </h3>

              <ul className="space-y-2 list-disc ml-2 marker:text-orange-500 list-inside text-gray-600">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </section>

            <hr className="border-gray-200" />

            <section>
              <h3 className="flex items-center gap-2 text-lg font-medium text-gray-900 mb-3 group">
                <Briefcase
                  size={20}
                  className="text-orange-500 transition-transform duration-200 group-hover:scale-125"
                />
                Responsibilities
              </h3>

              <ul className="space-y-2 list-disc ml-2 marker:text-orange-500 list-inside text-gray-600">
                {job.jobResponsibilities.map((res, i) => (
                  <li key={i}>{res}</li>
                ))}
              </ul>
            </section>

            <hr className="border-gray-200" />

            <section>
              <h3 className="flex items-center gap-2 text-lg font-medium text-gray-900 mb-3 group">
                <Gift
                  size={20}
                  className="text-orange-500  transition-transform duration-200 group-hover:scale-125"
                />
                Benefits
              </h3>

              <ul className="space-y-2 list-disc ml-2 list-inside marker:text-orange-500 text-gray-600">
                {job.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className=" border-t border-gray-200 py-6  bg-gray-50 flex flex-row  justify-center gap-2 ">
            <Button label="Approve" variant="confirm" onClick={onConfirm} />
            <Button label="Reject" variant="destructive" onClick={onReject} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default JobDetailsModal;
