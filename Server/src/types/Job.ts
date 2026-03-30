export interface Job {
  company: string;
  jobcategory: string;
  jobType: string;
  location: string;
  experience: string;
  Minsalary: number;
  Maxsalary: number;
  vacancy: number;
  jobDescription: string;
  requirements: string[];
  jobResponsibilities: string[];
  benefits: string[];
  applicationDeadline: string;
  status: "pending" | "approved" | "rejected";
  postedDate: string;
}
