import React, {
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Button from "@/components/ui/Button";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDown, X } from "lucide-react";
import CustomDropDownMenu from "@/components/ui/CustomDropDownMenu";

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

type JobEditModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: JobData | null;
  onSave: (updatedJob: JobData) => void;
};

const JobEditModal: React.FC<JobEditModalProps> = ({
  open,
  onOpenChange,
  job,
  onSave,
}) => {
  const [formData, setFormData] = useState<JobData | null>(job);

  useEffect(() => {
    setFormData(job);
  }, [job]);

  if (!formData) return null;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };
  // Handler for array fields (requirements, responsibilities, benefits)
  const handleArrayChange = (
    index: number,
    field: "requirements" | "jobResponsibilities" | "benefits",
    value: string,
  ) => {
    if (!formData) return;
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleAddArrayItem = (
    field: "requirements" | "jobResponsibilities" | "benefits",
  ) => {
    if (!formData) return;
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const handleRemoveArrayItem = (
    field: "requirements" | "jobResponsibilities" | "benefits",
    index: number,
  ) => {
    if (!formData) return;
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
      onOpenChange(false);
    }
  };

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
            overflow-y-auto
            flex flex-col
          "
        >
          {/* header */}
          <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">Edit Job</h2>

            <button
              onClick={() => onOpenChange(false)}
              className="p-2 rounded-md hover:bg-gray-100 transition"
            >
              <X size={20} />
            </button>
          </div>

          <form className="px-8 py-6 space-y-4" onSubmit={handleSubmit}>
            {/* Basic Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="jobTitle"
                placeholder="Job Title"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="jobType"
                placeholder="Job Type"
                value={formData.jobType}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="salary"
                placeholder="Salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="experience"
                placeholder="Experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <CustomDropDownMenu
                options={["Pending", "Approved", "Rejected"]}
                selected={formData.status}
                onSelect={(value) =>
                  setFormData({ ...formData, status: value })
                }
                icon={
                  <span className=" flex mt-1 ">
                    <ChevronDown size={20} />
                  </span>
                } // optional, you can add an icon if you want
                rotateIcon={false}
              />
            </div>

            {/* Textareas */}
            <textarea
              name="jobDescription"
              placeholder="Job Description"
              value={formData.jobDescription}
              onChange={handleInputChange}
              className="w-full border resize-none border-gray-300 rounded-md p-2"
              rows={5}
            />

            {/* Array fields */}
            {(["requirements", "jobResponsibilities", "benefits"] as const).map(
              (field) => (
                <div key={field} className="space-y-2 mt-4">
                  <h3 className="font-semibold">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </h3>
                  {formData[field].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 mt-4">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleArrayChange(index, field, e.target.value)
                        }
                        className="flex-1 border border-gray-300 rounded-md p-2"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem(field, index)}
                        className="px-2 py-1 bg-red-500 text-white rounded-md"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem(field)}
                    className="px-3 py-1 bg-green-500 text-white rounded-md mt-2"
                  >
                    Add {field.slice(0, -1)}
                  </button>
                </div>
              ),
            )}

            {/* Footer buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <Button type="submit" label="Save" variant="confirm" />
              <Button
                type="button"
                label="Cancel"
                variant="destructive"
                onClick={() => onOpenChange(false)}
              />
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default JobEditModal;
