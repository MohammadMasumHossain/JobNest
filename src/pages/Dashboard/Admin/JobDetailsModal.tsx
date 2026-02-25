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
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content
          className="
            fixed top-1/2 left-1/2 z-50
            w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%]
            max-w-2xl
            max-h-[90vh]
            overflow-y-auto
            rounded-lg
            bg-white
            p-4 sm:p-6 md:p-8
            -translate-x-1/2 -translate-y-1/2
            shadow-lg
          "
        >
          <div className="flex justify-between items-start ">
            <Dialog.Title className="text-lg sm:text-xl md:text-2xl font-bold">
              {job.jobTitle}
            </Dialog.Title>
            <button onClick={() => onOpenChange(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="mb-2 text-sm sm:text-base font-semibold">
            <div>{job.company}</div>
            <div>{job.location}</div>
          </div>

          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            {job.jobType} | {job.salary} | {job.experience} experience
          </p>

          <section className="mb-4">
            <h2 className="font-semibold mb-1 text-sm sm:text-base md:text-lg">
              Job Description
            </h2>
            <p className="text-sm sm:text-base">{job.jobDescription}</p>
          </section>

          <section className="mb-4">
            <h2 className="font-semibold mb-1 text-sm sm:text-base md:text-lg">
              Requirements
            </h2>
            <ul className="list-disc list-inside text-sm sm:text-base">
              {job.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="font-semibold mb-1 text-sm sm:text-base md:text-lg">
              Responsibilities
            </h2>
            <ul className="list-disc list-inside text-sm sm:text-base">
              {job.jobResponsibilities.map((res, i) => (
                <li key={i}>{res}</li>
              ))}
            </ul>
          </section>

          <section className="">
            <h2 className="font-semibold mb-1 text-sm sm:text-base md:text-lg">
              Benefits
            </h2>
            <ul className="list-disc list-inside text-sm sm:text-base">
              {job.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </section>

          <div className="flex flex-row  justify-center items-center  gap-2 ">
            <div>
              <Button label="Confirm" variant="confirm" onClick={onConfirm} />
            </div>
            <div>
              <Button label="Delete" variant="Delete" onClick={onDelete} />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default JobDetailsModal;
