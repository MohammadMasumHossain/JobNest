import { useNavigate, useParams } from "react-router";
import jobListData from "./jobList.json";

import toast, { Toaster } from "react-hot-toast";
import Button from "@/components/ui/Button";

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const job = jobListData.find((j) => j.id === id);

  if (!job) return <p className="p-6 text-red-500">Job not found.</p>;

  const handleConfirm = () => {
    toast.success("You confirmed the action!");
  };

  const handleCancel = () => {
    toast.error("You cancelled the action.");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-2xl mt-6">
      <Toaster position="top-right" />

      <button
        onClick={() => navigate(-1)}
        className="text-orange-600 hover:underline mb-4"
      >
        ← Back to Listings
      </button>

      <h1 className="text-3xl font-bold">{job.jobcategory}</h1>
      <p className="text-gray-500 mt-1">
        {job.company} • {job.location}
      </p>
      <p className="text-gray-600 mt-2">
        {job.jobType} | {job.salary} | {job.experience} experience
      </p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
        <p>{job.jobDescription}</p>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Requirements</h2>
        <ul className="list-disc list-inside">
          {job.requirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
        <ul className="list-disc list-inside">
          {job.jobResponsibilities.map((res, i) => (
            <li key={i}>{res}</li>
          ))}
        </ul>
      </section>

      <section className="mt-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Benefits</h2>
        <ul className="list-disc list-inside">
          {job.benefits.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </section>

      <div className="flex justify-center gap-4 mt-6">
        <Button label="Confirm" variant="confirm" onClick={handleConfirm} />
        <Button label="Delete" variant="Delete" onClick={handleCancel} />
      </div>
    </div>
  );
};

export default JobDetails;
