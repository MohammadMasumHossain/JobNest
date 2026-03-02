// import {
//   CalendarDays,
//   Mail,
//   Phone,
//   MapPin,
//   User,
//   GraduationCap,
//   Briefcase,
//   X,
// } from "lucide-react";
// import { useState } from "react";

// type EducationData = {
//   degree_title: string;
//   university: string;
//   Major: string;
//   passing_year: number;
// };

// type ProfileData = {
//   name: string;
//   email: string;
//   gender: string;
//   age: number;
//   role: string;
//   address: string;
//   mobile: string;
//   education: EducationData[];
//   job_designation: string;
//   company_name: string;
//   start_date: string;
//   end_date: string;
// };

// const ProfileView = ({ profile }: { profile: ProfileData }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   return (
//     <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
//       {/* Header */}
//       <div className="h-32 bg-linear-to-r from-gray-800 to-gray-700 relative">
//         <div className="absolute -bottom-12 left-8">
//           <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center text-3xl font-bold">
//             {profile.name.charAt(0)}
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-between">
//         <div className="pt-16 px-8 pb-6 border-b">
//           <h2 className="text-2xl font-semibold">{profile.name}</h2>
//           <p className="text-sm text-gray-400">{profile.role}</p>
//         </div>
//         <div>
//           <h2 className="text-xl font-semibold">
//             {isEditing ? "Edit Profile" : ""}
//           </h2>
//           {isEditing ? (
//             <button
//               onClick={() => {
//                 reset(profile);
//                 setIsEditing(false);
//               }}
//             >
//               <X size={24} className="text-white" />
//             </button>
//           ) : (
//             <button
//               onClick={() => setIsEditing(true)}
//               className="bg-gray-400 hover:bg-gray-500 text-white font-medium px-4 py-2 rounded transition"
//             >
//               Edit Profile
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="p-8 border-b">
//         <h3 className="font-semibold text-lg mb-6">Personal Information</h3>
//         <div className="grid md:grid-cols-2 gap-6 text-sm">
//           <div className="flex items-start gap-2">
//             <Mail size={18} className="text-gray-400 " />
//             <div className="flex-1 flex">
//               <span className=" w-26 font-medium text-gray-700">Email:</span>
//               <span className="text-gray-600">{profile.email}</span>
//             </div>
//           </div>
//           <div className="flex items-start gap-2">
//             <Phone size={18} className="text-gray-400 " />
//             <div className="flex-1 flex">
//               <span className="w-32 font-medium text-gray-700">Phone:</span>
//               <span className="text-gray-600">{profile.mobile}</span>
//             </div>
//           </div>
//           <div className="flex items-start gap-3">
//             <User size={18} className="text-gray-400 mt-1" />
//             <div className="flex-1 flex">
//               <span className="w-32 font-medium text-gray-700">Gender:</span>
//               <span className="text-gray-600">{profile.gender}</span>
//             </div>
//           </div>
//           <div className="flex items-start gap-3">
//             <User size={18} className="text-gray-400 mt-1" />
//             <div className="flex-1 flex">
//               <span className="w-32 font-medium text-gray-700">Age:</span>
//               <span className="text-gray-600">{profile.age}</span>
//             </div>
//           </div>
//           <div className="flex items-start gap-3">
//             <MapPin size={18} className="text-gray-400 mt-1" />
//             <div className="flex-1 flex">
//               <span className="w-32 font-medium text-gray-700">Address:</span>
//               <span className="text-gray-600 ">{profile.address}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="p-8 border-b">
//         <h3 className="font-semibold text-lg mb-6">Education</h3>
//         {profile.education.map((edu, i) => (
//           <div
//             key={i}
//             className="grid md:grid-cols-2 gap-6 mb-6 last:mb-0 text-sm"
//           >
//             <div className="flex items-center gap-2">
//               <GraduationCap size={18} className="text-gray-400" />
//               <span className="w-32 font-medium text-gray-700">Degree:</span>
//               <span className="text-gray-600">{edu.degree_title}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <GraduationCap size={18} className="text-gray-400" />
//               <span className="w-32 font-medium text-gray-700">
//                 University:
//               </span>
//               <span className="text-gray-600">{edu.university}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <GraduationCap size={18} className="text-gray-400" />
//               <span className="w-32 font-medium text-gray-700">Major:</span>
//               <span className="text-gray-600">{edu.Major}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <GraduationCap size={18} className="text-gray-400" />
//               <span className="w-32 font-medium text-gray-700">
//                 Passing Year:
//               </span>
//               <span className="text-gray-600">{edu.passing_year}</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="p-8">
//         <h3 className="font-semibold text-lg mb-6">Work Details</h3>
//         <div className="grid md:grid-cols-2 gap-6 text-sm">
//           <div className="flex items-center gap-2">
//             <Briefcase size={18} className="text-gray-400" />
//             <span className="w-32 font-medium text-gray-700">Designation:</span>
//             <span className="text-gray-600">{profile.job_designation}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Briefcase size={18} className="text-gray-400" />
//             <span className="w-32 font-medium text-gray-700">Company:</span>
//             <span className="text-gray-600">{profile.company_name}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <CalendarDays size={18} className="text-gray-400" />
//             <span className="w-32 font-medium text-gray-700">Start Date:</span>
//             <span className="text-gray-600">{profile.start_date}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <CalendarDays size={18} className="text-gray-400" />
//             <span className="w-32 font-medium text-gray-700">End Date:</span>
//             <span className="text-gray-600">{profile.end_date}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileView;
// import {
//   CalendarDays,
//   Mail,
//   Phone,
//   MapPin,
//   User,
//   GraduationCap,
//   Briefcase,
// } from "lucide-react";

// type EducationData = {
//   degree_title: string;
//   university: string;
//   Major: string;
//   passing_year: number;
// };

// type ProfileData = {
//   name: string;
//   email: string;
//   gender: string;
//   age: number;
//   role: string;
//   address: string;
//   mobile: string;
//   education: EducationData[];
//   job_designation: string;
//   company_name: string;
//   start_date: string;
//   end_date: string;
// };

// interface ProfileViewProps {
//   profile: ProfileData;
//   onEdit: () => void; // callback from parent
// }

// const ProfileView = ({ profile, onEdit }: ProfileViewProps) => {
//   return (
//     <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden relative">
//       {/* Edit Button */}

//       {/* Header */}
//       <div className="h-32 bg-linear-to-r from-gray-800 to-gray-700 relative">
//         <div className="absolute -bottom-12 left-8">
//           <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center text-3xl font-bold">
//             {profile.name.charAt(0)}
//           </div>
//         </div>
//       </div>

//       <div className="">
//         <div className="pt-16 px-8 pb-6 border-b">
//           <h2 className="text-2xl font-semibold">{profile.name}</h2>
//           <p className="text-sm text-gray-400">{profile.role}</p>
//         </div>
//         <div>
//           <button
//             onClick={onEdit}
//             className="absolute top-46 right-6 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded transition"
//           >
//             Edit Profile
//           </button>
//         </div>
//       </div>

//       {/* Personal Info */}
//       <div className="p-8 border-b">
//         <h3 className="font-semibold text-lg mb-6">Personal Information</h3>
//         <div className="grid md:grid-cols-2 gap-6 text-sm">
//           <div className="flex items-start gap-2">
//             <Mail size={18} className="text-gray-400 " />
//             <div className="flex-1 flex">
//               <span className=" w-26 font-medium text-gray-700">Email:</span>
//               <span className="text-gray-600">{profile.email}</span>
//             </div>
//           </div>
//           <div className="flex items-start gap-2">
//             <Phone size={18} className="text-gray-400 " />
//             <div className="flex-1 flex">
//               <span className="w-32 font-medium text-gray-700">Phone:</span>
//               <span className="text-gray-600">{profile.mobile}</span>
//             </div>
//           </div>
//           <div className="flex items-start gap-3">
//             <User size={18} className="text-gray-400 " />
//             <div className="flex-1 flex">
//               <span className="w-32 font-medium text-gray-700">Gender:</span>
//               <span className="text-gray-600">{profile.gender}</span>
//             </div>
//           </div>
//           <div className="flex items-start gap-3">
//             <User size={18} className="text-gray-400 " />
//             <div className="flex-1 flex">
//               <span className="w-32 font-medium text-gray-700">Age:</span>
//               <span className="text-gray-600">{profile.age}</span>
//             </div>
//           </div>
//           <div className="flex items-start gap-3">
//             <MapPin size={18} className="text-gray-400 " />
//             <div className="flex-1 flex">
//               <span className="w-32 font-medium text-gray-700">Address:</span>
//               <span className="text-gray-600 ">{profile.address}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Education */}
//       <div className="p-8 border-b">
//         <h3 className="font-semibold text-lg mb-6">Education</h3>
//         {profile.education.map((edu, i) => (
//           <div
//             key={i}
//             className="grid md:grid-cols-2 gap-6 mb-6 last:mb-0 text-sm"
//           >
//             <div className="flex items-center gap-2">
//               <GraduationCap size={18} className="text-gray-400" />
//               <span className="w-32 font-medium text-gray-700">Degree:</span>
//               <span className="text-gray-600">{edu.degree_title}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <GraduationCap size={18} className="text-gray-400" />
//               <span className="w-32 font-medium text-gray-700">
//                 University:
//               </span>
//               <span className="text-gray-600">{edu.university}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <GraduationCap size={18} className="text-gray-400" />
//               <span className="w-32 font-medium text-gray-700">Major:</span>
//               <span className="text-gray-600">{edu.Major}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <GraduationCap size={18} className="text-gray-400" />
//               <span className="w-32 font-medium text-gray-700">
//                 Passing Year:
//               </span>
//               <span className="text-gray-600">{edu.passing_year}</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Work Details */}
//       <div className="p-8">
//         <h3 className="font-semibold text-lg mb-6">Work Details</h3>
//         <div className="grid md:grid-cols-2 gap-6 text-sm">
//           <div className="flex items-center gap-2">
//             <Briefcase size={18} className="text-gray-400" />
//             <span className="w-32 font-medium text-gray-700">Designation:</span>
//             <span className="text-gray-600">{profile.job_designation}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Briefcase size={18} className="text-gray-400" />
//             <span className="w-32 font-medium text-gray-700">Company:</span>
//             <span className="text-gray-600">{profile.company_name}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <CalendarDays size={18} className="text-gray-400" />
//             <span className="w-32 font-medium text-gray-700">Start Date:</span>
//             <span className="text-gray-600">{profile.start_date}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <CalendarDays size={18} className="text-gray-400" />
//             <span className="w-32 font-medium text-gray-700">End Date:</span>
//             <span className="text-gray-600">{profile.end_date}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileView;
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
    // <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden relative">
    //   <div className="bg-linear-to-r from-gray-800 to-gray-700 p-8 relative flex items-center">
    //     <label className="cursor-pointer w-24 h-24 rounded-full border-4 border-white overflow-hidden flex-shrink-0 bg-gray-800">
    //       <input
    //         type="file"
    //         accept="image/*"
    //         className="hidden"
    //         onChange={handleImageChange}
    //       />
    //       {image ? (
    //         <img
    //           src={image}
    //           alt="Profile"
    //           className="w-full h-full object-cover"
    //         />
    //       ) : (
    //         <span className="text-4xl font-bold text-gray-400 flex items-center justify-center w-full h-full">
    //           {profile.name.charAt(0)}
    //         </span>
    //       )}
    //     </label>

    //     {/* Name and Role */}
    //     <div className="ml-6 flex-1">
    //       <h2 className="text-3xl font-semibold text-white">{profile.name}</h2>
    //       <p className="text-gray-200 mt-1">{profile.role}</p>
    //     </div>

    //     {/* Edit Button */}
    //     <button
    //       onClick={onEdit}
    //       className="ml-4 bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded transition"
    //     >
    //       Edit Profile
    //     </button>
    //   </div>

    //   {/* Personal Info */}
    //   <div className="p-8 border-b">
    //     <h3 className="font-semibold text-lg mb-6">Personal Information</h3>
    //     <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
    //       <div className="flex items-start gap-2">
    //         <Mail size={18} className="text-gray-400" />
    //         <div className="flex-1 flex">
    //           <span className="w-28 font-medium text-gray-700">Email:</span>
    //           <span className="text-gray-600">{profile.email}</span>
    //         </div>
    //       </div>
    //       <div className="flex items-start gap-2">
    //         <Phone size={18} className="text-gray-400" />
    //         <div className="flex-1 flex">
    //           <span className="w-28 font-medium text-gray-700">Phone:</span>
    //           <span className="text-gray-600">{profile.mobile}</span>
    //         </div>
    //       </div>
    //       <div className="flex items-start gap-2">
    //         <User size={18} className="text-gray-400" />
    //         <div className="flex-1 flex">
    //           <span className="w-28 font-medium text-gray-700">Gender:</span>
    //           <span className="text-gray-600">{profile.gender}</span>
    //         </div>
    //       </div>
    //       <div className="flex items-start gap-2">
    //         <Calendar size={18} className="text-gray-400" />
    //         <div className="flex-1 flex">
    //           <span className="w-28 font-medium text-gray-700">Age:</span>
    //           <span className="text-gray-600">{profile.age}</span>
    //         </div>
    //       </div>
    //       <div className="flex items-start gap-2">
    //         <MapPin size={18} className="text-gray-400" />
    //         <div className="flex-1 flex">
    //           <span className="w-28 font-medium text-gray-700">Address:</span>
    //           <span className="text-gray-600">{profile.address}</span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Education */}
    //   <div className="p-8 border-b">
    //     <h3 className="font-semibold text-lg mb-6">Education</h3>
    //     {profile.education.map((edu, i) => (
    //       <div
    //         key={i}
    //         className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 mb-6 last:mb-0 text-sm"
    //       >
    //         <div className="flex items-center gap-2">
    //           <BookOpen size={18} className="text-gray-400" />
    //           <span className="w-28 font-medium text-gray-700">Degree:</span>
    //           <span className="text-gray-600">{edu.degree_title}</span>
    //         </div>
    //         <div className="flex items-center gap-2">
    //           <University size={18} className="text-gray-400" />
    //           <span className="w-28 font-medium text-gray-700">
    //             University:
    //           </span>
    //           <span className="text-gray-600">{edu.university}</span>
    //         </div>
    //         <div className="flex items-center gap-2">
    //           <FileText size={18} className="text-gray-400" />
    //           <span className="w-28 font-medium text-gray-700">Major:</span>
    //           <span className="text-gray-600">{edu.Major}</span>
    //         </div>
    //         <div className="flex items-center gap-2">
    //           <CalendarDays size={18} className="text-gray-400" />
    //           <span className="w-28 font-medium text-gray-700">Year:</span>
    //           <span className="text-gray-600">{edu.passing_year}</span>
    //         </div>
    //       </div>
    //     ))}
    //   </div>

    //   {/* Work Details */}
    //   <div className="p-8">
    //     <h3 className="font-semibold text-lg mb-6">Work Details</h3>
    //     {profile.work.map((job, i) => (
    //       <div
    //         key={i}
    //         className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 mb-4 text-sm"
    //       >
    //         <div className="flex items-center gap-2">
    //           <Award size={18} className="text-gray-400" />
    //           <span className="w-28 font-medium text-gray-700">
    //             Designation:
    //           </span>
    //           <span className="text-gray-600">{job.job_designation}</span>
    //         </div>
    //         <div className="flex items-center gap-2">
    //           <Building size={18} className="text-gray-400" />
    //           <span className="w-28 font-medium text-gray-700">Company:</span>
    //           <span className="text-gray-600">{job.company_name}</span>
    //         </div>
    //         <div className="flex items-center gap-2">
    //           <Calendar size={18} className="text-gray-400" />
    //           <span className="w-28 font-medium text-gray-700">
    //             Start Date:
    //           </span>
    //           <span className="text-gray-600">
    //             {new Date(job.start_date).toLocaleDateString()}
    //           </span>
    //         </div>
    //         <div className="flex items-center gap-2">
    //           <Calendar size={18} className="text-gray-400" />
    //           <span className="w-28 font-medium text-gray-700">End Date:</span>
    //           <span className="text-gray-600">
    //             {new Date(job.end_date).toLocaleDateString()}
    //           </span>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className=" max-w-8xl mx-auto bg-white rounded-md overflow-hidden relative">
      {/* Header */}
      <div className="bg-linear-to-r from-gray-800 to-gray-700 p-12 relative flex items-center">
        {/* Profile Image */}
        <label className="cursor-pointer w-28 h-28 rounded-full border-4 border-white overflow-hidden shrink-0 bg-gray-800">
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
            <span className="text-5xl font-bold text-gray-400 flex items-center justify-center w-full h-full">
              {profile.name.charAt(0)}
            </span>
          )}
        </label>

        {/* Name and Role */}
        <div className="ml-8 flex-1">
          <h2 className="text-4xl font-semibold text-white">{profile.name}</h2>
          <p className="text-gray-200 mt-2 text-lg">{profile.role}</p>
        </div>

        {/* Edit Button */}
        <button
          onClick={onEdit}
          className="ml-6 bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-md transition"
        >
          Edit Profile
        </button>
      </div>

      {/* Personal Info */}
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

      {/* Education */}
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

      {/* Work Details */}
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
