import {
  Briefcase,
  CircleUserRound,
  LayoutDashboard,
  List,
  UserCog,
  Menu,
  X,
  MoveRight,
  LogOut,
  type LucideIcon,
} from "lucide-react";

import { useState } from "react";
import { NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

type MenuItem = {
  name: string;
  icon: LucideIcon;
  path: string;
};

const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Job Post", icon: Briefcase, path: "/dashboard/jobpost" },
  { name: "Job Listing", icon: List, path: "/dashboard/joblisting" },
  { name: "User", icon: UserCog, path: "/dashboard/manageuser" },
];

const profileItem: MenuItem = {
  name: "Masum Hossain",
  icon: CircleUserRound,
  path: "/dashboard/profile",
};

const Dashboard_sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-800 text-white flex items-center justify-between px-4 py-3 shadow z-50">
        <button onClick={() => setMobileOpen(true)}>
          <Menu size={28} />
        </button>
        <div />
      </div>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white z-50 md:hidden shadow-xl"
          >
            <div className="flex justify-end p-4">
              <button onClick={() => setMobileOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <SidebarContent isOpen={true} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.div
        animate={{ width: isOpen ? 260 : 80 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex flex-col h-screen bg-gray-800 text-white shadow-xl relative"
      >
        {isOpen ? (
          <div className="flex items-center justify-between px-6 mt-4 mb-2">
            <div className="flex items-center gap-3">
              <NavLink to="">
                <img
                  src="/jobnestimg.webp"
                  className="w-12 h-12 rounded-full bg-white"
                  alt="logo"
                />
              </NavLink>
              <h1 className="text-xl font-bold tracking-wide">JobNest</h1>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition"
            >
              <Menu size={22} />
            </button>
          </div>
        ) : (
          <div className="flex justify-center mt-4 mb-2">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition"
            >
              <MoveRight size={22} />
            </button>
          </div>
        )}

        <SidebarContent isOpen={isOpen} />
      </motion.div>
    </>
  );
};

const SidebarContent = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="flex flex-col justify-between h-full pt-2 relative">
      <ul className="space-y-2 mt-4 px-2">
        {menuItems.map((item) => (
          <NavLink key={item.path} to={item.path} end>
            {({ isActive }) => (
              <li className="relative group">
                <div
                  className={`flex items-center ${
                    isOpen
                      ? "gap-4 px-3 py-3 justify-start"
                      : "justify-center py-3"
                  } rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-orange-500 text-white shadow-md"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <item.icon size={isOpen ? 22 : 24} />
                  {isOpen && (
                    <span className="text-sm md:text-base font-medium md:font-semibold tracking-wide">
                      {item.name}
                    </span>
                  )}
                </div>

                {/* Tooltip for collapsed sidebar */}
                {!isOpen && (
                  <span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    {item.name}
                  </span>
                )}
              </li>
            )}
          </NavLink>
        ))}
      </ul>

      <div className="p-2 border-t border-gray-700 mb-4 space-y-2">
        <NavLink to={profileItem.path} end>
          {({ isActive }) => (
            <li className="relative group">
              <div
                className={`flex items-center ${
                  isOpen
                    ? "gap-4 px-3 py-3 justify-start"
                    : "justify-center py-3"
                } rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-orange-500 text-white shadow-md"
                    : "hover:bg-gray-700"
                }`}
              >
                <profileItem.icon size={isOpen ? 22 : 24} />
                {isOpen && (
                  <span className="text-sm md:text-base font-medium md:font-semibold tracking-wide">
                    {profileItem.name}
                  </span>
                )}
              </div>

              {!isOpen && (
                <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded-md bg-gray-900 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  {profileItem.name}
                </span>
              )}
            </li>
          )}
        </NavLink>

        <NavLink to="/dashboard/logout">
          <li className="relative group">
            <div
              className={`flex items-center cursor-pointer ${
                isOpen ? "gap-4 px-3 py-3 justify-start" : "justify-center py-3"
              } rounded-lg transition-all duration-200 hover:bg-gray-700`}
            >
              <LogOut size={isOpen ? 22 : 24} />
              {isOpen && (
                <span className="text-sm md:text-base font-medium md:font-semibold tracking-wide">
                  Logout
                </span>
              )}
            </div>

            {!isOpen && (
              <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded-md bg-gray-900 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
                Logout
              </span>
            )}
          </li>
        </NavLink>
      </div>
    </div>
  );
};

export default Dashboard_sidebar;
