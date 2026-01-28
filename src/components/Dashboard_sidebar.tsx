import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  LayoutDashboard,
  List,
  UserCog,
} from "lucide-react";
import { useState } from "react";

const Dashboard_sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "jobPost", icon: Briefcase },
    { name: "Job Listing", icon: List },
    { name: "ManageUser", icon: UserCog },
    { name: "Profile", icon: CircleUserRound },
  ];
  return (
    <div
      className={`relative h-screen bg-secondary  text-white w-20 ${isOpen ? "w-64" : "w-20"}`}
    >
      <div className="">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-14 -right-3 bg-white text-gray-900 rounded-full p-1 border border-gray-900 cursor-pointer "
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight />}
        </button>
      </div>
      <div
        className={`${isOpen ? "pt-10 pl-10" : "pl-4 pt-10"} flex items-center  gap-4`}
      >
        <img
          className={` ${isOpen ? "w-14 h-14" : "w-8 h-8 "} rounded-full bg-white`}
          src="jobnestimg.webp"
          alt=""
        />
        <h1
          className={`origin-left font-extrabold text-2xl ${!isOpen && "scale-0"}`}
        >
          JobNest
        </h1>
      </div>

      <div className="mt-6 place-items-center ">
        <ul className="pt-2 grow ">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="flex rounded-md py-2 lg:px-10  cursor-pointer hover:text-orange-500  hover:bg-white/10 items-center gap-x-4 mb-2 mx-2"
            >
              <div className="bg-gray-400  p-2 rounded-full">
                <item.icon size={24} />
              </div>
              <span
                className={`${!isOpen && "hidden"}   origin-left duration-300`}
              >
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard_sidebar;
