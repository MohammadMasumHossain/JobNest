import {
  CalendarDays,
  Mail,
  Phone,
  MapPin,
  User,
  GraduationCap,
  Briefcase,
} from "lucide-react";

type EducationData = {
  degree_title: string;
  university: string;
  Major: string;
  passing_year: number;
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
  job_designation: string;
  company_name: string;
  start_date: string;
  end_date: string;
};

const ProfileView = ({ profile }: { profile: ProfileData }) => {
  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      {/* Header */}
      <div className="h-32 bg-linear-to-r from-gray-800 to-gray-700 relative">
        <div className="absolute -bottom-12 left-8">
          <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center text-3xl font-bold">
            {profile.name.charAt(0)}
          </div>
        </div>
      </div>

      <div className="pt-16 px-8 pb-6 border-b">
        <h2 className="text-2xl font-semibold">{profile.name}</h2>
        <p className="text-sm text-gray-400">{profile.role}</p>
      </div>

      <div className="p-8 border-b">
        <h3 className="font-semibold text-lg mb-6">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div className="flex items-start gap-3">
            <Mail size={18} className="text-gray-400 mt-1" />
            <div className="flex-1 flex">
              <span className="w-32 font-medium text-gray-700">Email:</span>
              <span className="text-gray-600">{profile.email}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={18} className="text-gray-400 mt-1" />
            <div className="flex-1 flex">
              <span className="w-32 font-medium text-gray-700">Phone:</span>
              <span className="text-gray-600">{profile.mobile}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <User size={18} className="text-gray-400 mt-1" />
            <div className="flex-1 flex">
              <span className="w-32 font-medium text-gray-700">Gender:</span>
              <span className="text-gray-600">{profile.gender}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <User size={18} className="text-gray-400 mt-1" />
            <div className="flex-1 flex">
              <span className="w-32 font-medium text-gray-700">Age:</span>
              <span className="text-gray-600">{profile.age}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-gray-400 mt-1" />
            <div className="flex-1 flex">
              <span className="w-32 font-medium text-gray-700">Address:</span>
              <span className="text-gray-600 ">{profile.address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 border-b">
        <h3 className="font-semibold text-lg mb-6">Education</h3>
        {profile.education.map((edu, i) => (
          <div
            key={i}
            className="grid md:grid-cols-2 gap-6 mb-6 last:mb-0 text-sm"
          >
            <div className="flex items-center gap-2">
              <GraduationCap size={18} className="text-gray-400" />
              <span className="w-32 font-medium text-gray-700">Degree:</span>
              <span className="text-gray-600">{edu.degree_title}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap size={18} className="text-gray-400" />
              <span className="w-32 font-medium text-gray-700">
                University:
              </span>
              <span className="text-gray-600">{edu.university}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap size={18} className="text-gray-400" />
              <span className="w-32 font-medium text-gray-700">Major:</span>
              <span className="text-gray-600">{edu.Major}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap size={18} className="text-gray-400" />
              <span className="w-32 font-medium text-gray-700">
                Passing Year:
              </span>
              <span className="text-gray-600">{edu.passing_year}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8">
        <h3 className="font-semibold text-lg mb-6">Work Details</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Briefcase size={18} className="text-gray-400" />
            <span className="w-32 font-medium text-gray-700">Designation:</span>
            <span className="text-gray-600">{profile.job_designation}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={18} className="text-gray-400" />
            <span className="w-32 font-medium text-gray-700">Company:</span>
            <span className="text-gray-600">{profile.company_name}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays size={18} className="text-gray-400" />
            <span className="w-32 font-medium text-gray-700">Start Date:</span>
            <span className="text-gray-600">{profile.start_date}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays size={18} className="text-gray-400" />
            <span className="w-32 font-medium text-gray-700">End Date:</span>
            <span className="text-gray-600">{profile.end_date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
