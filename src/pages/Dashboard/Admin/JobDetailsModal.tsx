"use client";

import Button from "@/components/ui/Button";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export type JobData = {
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

type JobDetailsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: JobData | null;
  onConfirm: () => void;
  onDelete: () => void;
};

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  open,
  onOpenChange,
  job,
  onConfirm,
  onDelete,
}) => {
  if (!job) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0  bg-black/50" />
        <Dialog.Content className="fixed pl-10 pt-10  top-1/2 left-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg overflow-y-auto max-h-[90vh]">
          <div className="flex justify-between items-center mb-2 mt-2 ">
            <Dialog.Title className="text-xl font-bold">
              {job.jobTitle}
            </Dialog.Title>
            <button onClick={() => onOpenChange(false)}>
              <X size={24} />
            </button>
          </div>

          <p className=" text-bold text-lg mb-2">
            <div>{job.company}</div>
            <div>{job.location}</div>
          </p>
          <p className="text-gray-600 mb-4">
            {job.jobType} | {job.salary} | {job.experience} experience
          </p>

          <section className="mb-4">
            <h2 className="font-semibold mb-1">Job Description</h2>
            <p>{job.jobDescription}</p>
          </section>

          <section className="mb-4">
            <h2 className="font-semibold mb-1">Requirements</h2>
            <ul className="list-disc list-inside">
              {job.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="font-semibold mb-1">Responsibilities</h2>
            <ul className="list-disc list-inside">
              {job.jobResponsibilities.map((res, i) => (
                <li key={i}>{res}</li>
              ))}
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="font-semibold mb-1">Benefits</h2>
            <ul className="list-disc list-inside">
              {job.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </section>

          <div className="flex justify-center gap-4 mt-6">
            <Button label="Confirm" variant="confirm" onClick={onConfirm} />
            <Button label="Delete" variant="Delete" onClick={onDelete} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default JobDetailsModal;
