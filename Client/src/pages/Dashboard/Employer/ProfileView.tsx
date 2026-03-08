import {
  Calendar,
  Mail,
  Phone,
  MapPin,
  User,
  BookOpen,
  University,
  FileText,
  CalendarDays,
  Award,
  Building,
} from "lucide-react";
import { useState, type ChangeEvent } from "react";

type EducationData = {
  degree_title: string;
  university: string;
  Major: string;
  passing_year: number;
};

type WorkData = {
  job_designation: string;
  company_name: string;
  start_date: string;
  end_date: string;
};

type ProfileData = {
  name: string;
  email: string;
  gender: string;
  age: number;
  role: string;
  address: string;
  mobile: string;
  education: EducationData[];
  work: WorkData[];
  profile_image?: string;
};

interface ProfileViewProps {
  profile: ProfileData;
  onEdit: () => void;
}

const ProfileView = ({ profile, onEdit }: ProfileViewProps) => {
  const [image, setImage] = useState(profile.profile_image || "");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className=" max-w-8xl mx-auto bg-white rounded-md overflow-hidden relative">
      <div
        className="bg-linear-to-r from-gray-800 to-gray-700 
                p-6 sm:p-8 md:p-10 lg:p-12 
                relative flex flex-col sm:flex-row 
                items-center sm:items-center 
                gap-6 sm:gap-8"
      >
        <label
          className="cursor-pointer 
                    w-20 h-20 
                    sm:w-24 sm:h-24 
                    md:w-28 md:h-28 
                    rounded-full border-4 border-white 
                    overflow-hidden shrink-0 bg-gray-800"
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span
              className="text-3xl sm:text-4xl md:text-5xl 
                       font-bold text-gray-400 
                       flex items-center justify-center 
                       w-full h-full"
            >
              {profile.name.charAt(0)}
            </span>
          )}
        </label>

        <div className="text-center sm:text-left flex-1">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl 
                   font-semibold text-white"
          >
            {profile.name}
          </h2>
          <p
            className="text-gray-200 mt-2 
                  text-sm sm:text-base md:text-lg"
          >
            {profile.role}
          </p>
        </div>

        <button
          onClick={onEdit}
          className="bg-orange-500 hover:bg-orange-600 
               text-white font-medium 
               px-4 py-2 
               sm:px-5 sm:py-2.5 
               md:px-6 md:py-3 
               rounded-md transition 
               w-full sm:w-auto"
        >
          Edit Profile
        </button>
      </div>

      <div className="pl-12 pr-12 pt-8 pb-8 border-b">
        <h3 className="font-semibold text-2xl mb-8">Personal Information</h3>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 text-sm">
          <div className="flex items-start gap-3">
            <Mail size={20} className="text-gray-400" />
            <div className="flex-1 flex">
              <span className="w-32 font-medium text-gray-700">Email:</span>
              <span className="text-gray-600">{profile.email}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={20} className="text-gray-400" />
            <div className="flex-1 flex">
              <span className="w-32 font-medium text-gray-700">Phone:</span>
              <span className="text-gray-600">{profile.mobile}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <User size={20} className="text-gray-400" />
            <div className="flex-1 flex">
              <span className="w-32 font-medium text-gray-700">Gender:</span>
              <span className="text-gray-600">{profile.gender}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar size={20} className="text-gray-400" />
            <div className="flex-1 flex">
              <span className="w-32 font-medium text-gray-700">Age:</span>
              <span className="text-gray-600">{profile.age}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={20} className="text-gray-400" />
            <div className="flex-1 flex">
              <span className="w-32 font-medium text-gray-700">Address:</span>
              <span className="text-gray-600">{profile.address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pl-12 pr-12 pt-8 pb-8 border-b">
        <h3 className="font-semibold text-2xl mb-8">Education</h3>
        {profile.education.map((edu, i) => (
          <div
            key={i}
            className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 mb-8 last:mb-0 text-sm"
          >
            <div className="flex items-center gap-3">
              <BookOpen size={20} className="text-gray-400" />
              <span className="w-32 font-medium text-gray-700">Degree:</span>
              <span className="text-gray-600">{edu.degree_title}</span>
            </div>
            <div className="flex items-center gap-3">
              <University size={20} className="text-gray-400" />
              <span className="w-32 font-medium text-gray-700">
                University:
              </span>
              <span className="text-gray-600">{edu.university}</span>
            </div>
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-gray-400" />
              <span className="w-32 font-medium text-gray-700">Major:</span>
              <span className="text-gray-600">{edu.Major}</span>
            </div>
            <div className="flex items-center gap-3">
              <CalendarDays size={20} className="text-gray-400" />
              <span className="w-32 font-medium text-gray-700">Year:</span>
              <span className="text-gray-600">{edu.passing_year}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pl-12 pr-12 pt-8 pb-8">
        <h3 className="font-semibold text-2xl mb-6">Work Details</h3>
        {profile.work.map((job, i) => (
          <div
            key={i}
            className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8  text-sm"
          >
            <div className="flex items-center gap-3">
              <Award size={20} className="text-gray-400" />
              <span className="w-32 font-medium text-gray-700">
                Designation:
              </span>
              <span className="text-gray-600">{job.job_designation}</span>
            </div>
            <div className="flex items-center gap-3">
              <Building size={20} className="text-gray-400" />
              <span className="w-32 font-medium text-gray-700">Company:</span>
              <span className="text-gray-600">{job.company_name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-gray-400" />
              <span className="w-32 font-medium text-gray-700">
                Start Date:
              </span>
              <span className="text-gray-600">
                {new Date(job.start_date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-gray-400" />
              <span className="w-32 font-medium text-gray-700">End Date:</span>
              <span className="text-gray-600">
                {new Date(job.end_date).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileView;
