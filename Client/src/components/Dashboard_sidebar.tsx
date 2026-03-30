// import {
//   CircleUserRound,
//   LayoutDashboard,
//   List,
//   UserCog,
//   Menu,
//   X,
//   MoveRight,
//   LogOut,
//   type LucideIcon,
// } from "lucide-react";

// import { useState } from "react";
// import { NavLink } from "react-router";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAuth } from "@/context/AuthContext";

// type MenuItem = {
//   name: string;
//   icon: LucideIcon;
//   path: string;
// };

// const Dashboard_sidebar = () => {
//   const { user, loading } = useAuth(); //
//   const [isOpen, setIsOpen] = useState(true);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
//       </div>
//     );
//   }

//   const menuItems: MenuItem[] = [
//     { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
//     { name: "Job Listing", icon: List, path: "/dashboard/joblisting" },

//     ...(user?.role === "Admin"
//       ? [{ name: "User", icon: UserCog, path: "/dashboard/manageuser" }]
//       : []),
//   ];

//   const profileItem: MenuItem = {
//     name: user?.name || "User",
//     icon: CircleUserRound,
//     path: "/dashboard/profile",
//   };

//   return (
//     <>
//       {/* 🔹 Mobile Top Bar */}
//       <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-800 text-white flex items-center justify-between px-4 py-3 shadow z-50">
//         <button onClick={() => setMobileOpen(true)}>
//           <Menu size={28} />
//         </button>
//         <div />
//       </div>

//       {/* 🔹 Overlay */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setMobileOpen(false)}
//             className="fixed inset-0 bg-black/40 z-40 md:hidden"
//           />
//         )}
//       </AnimatePresence>

//       {/* 🔹 Mobile Sidebar */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ x: -260 }}
//             animate={{ x: 0 }}
//             exit={{ x: -260 }}
//             transition={{ duration: 0.3 }}
//             className="fixed top-0 left-0 min-h-screen w-64 bg-gray-800 text-white z-50 shadow-xl flex flex-col"
//           >
//             <div className="flex justify-end p-4">
//               <button onClick={() => setMobileOpen(false)}>
//                 <X size={24} />
//               </button>
//             </div>

//             <SidebarContent
//               isOpen={true}
//               menuItems={menuItems}
//               profileItem={profileItem}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* 🔹 Desktop Sidebar */}
//       <motion.div
//         animate={{ width: isOpen ? 260 : 80 }}
//         transition={{ duration: 0.3 }}
//         className="hidden md:flex flex-col h-screen bg-gray-800 text-white shadow-xl"
//       >
//         {isOpen ? (
//           <div className="flex items-center justify-between px-6 mt-4 mb-2">
//             <div className="flex items-center gap-3">
//               <NavLink to="/dashboard">
//                 <img
//                   src="/jobnestimg.webp"
//                   className="w-12 h-12 rounded-full bg-white"
//                   alt="logo"
//                 />
//               </NavLink>
//               <h1 className="text-xl font-bold">JobNest</h1>
//             </div>

//             <button
//               onClick={() => setIsOpen(false)}
//               className="bg-gray-700 p-2 rounded-full hover:bg-gray-600"
//             >
//               <Menu size={22} />
//             </button>
//           </div>
//         ) : (
//           <div className="flex justify-center mt-4 mb-2">
//             <button
//               onClick={() => setIsOpen(true)}
//               className="bg-gray-700 p-2 rounded-full hover:bg-gray-600"
//             >
//               <MoveRight size={22} />
//             </button>
//           </div>
//         )}

//         <SidebarContent
//           isOpen={isOpen}
//           menuItems={menuItems}
//           profileItem={profileItem}
//         />
//       </motion.div>
//     </>
//   );
// };

// const SidebarContent = ({
//   isOpen,
//   menuItems,
//   profileItem,
// }: {
//   isOpen: boolean;
//   menuItems: MenuItem[];
//   profileItem: MenuItem;
// }) => {
//   return (
//     <div className="flex flex-col flex-1 justify-between pt-2">
//       {/* 🔹 Menu */}
//       <ul className="space-y-2 mt-4 px-2">
//         {menuItems.map((item) => (
//           <NavLink key={item.path} to={item.path} end>
//             {({ isActive }) => (
//               <li className="relative group">
//                 <div
//                   className={`flex items-center ${
//                     isOpen ? "gap-4 px-3 py-3" : "justify-center py-3"
//                   } rounded-lg ${
//                     isActive ? "bg-orange-500 text-white" : "hover:bg-gray-700"
//                   }`}
//                 >
//                   <item.icon size={isOpen ? 22 : 24} />
//                   {isOpen && <span>{item.name}</span>}
//                 </div>

//                 {!isOpen && (
//                   <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100">
//                     {item.name}
//                   </span>
//                 )}
//               </li>
//             )}
//           </NavLink>
//         ))}
//       </ul>

//       {/* 🔹 Profile + Logout */}
//       <div className="p-2 border-t border-gray-700 space-y-2">
//         <NavLink to={profileItem.path}>
//           <div className="flex items-center gap-3 px-3 py-3 hover:bg-gray-700 rounded-lg">
//             <profileItem.icon size={22} />
//             {isOpen && <span>{profileItem.name}</span>}
//           </div>
//         </NavLink>

//         <NavLink to="/dashboard/logout">
//           <div className="flex items-center gap-3 px-3 py-3 hover:bg-gray-700 rounded-lg">
//             <LogOut size={22} />
//             {isOpen && <span>Logout</span>}
//           </div>
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default Dashboard_sidebar;
import {
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
import { useAuth } from "@/context/AuthContext";

type MenuItem = {
  name: string;
  icon: LucideIcon;
  path: string;
};

const Dashboard_sidebar = () => {
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500">
          loading
        </div>
      </div>
    );
  }

  // 🔹 CHANGED: build menuItems reactively after user is loaded
  const menuItems: MenuItem[] = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Job Listing", icon: List, path: "/dashboard/joblisting" },
  ];

  if (user?.role === "Admin") {
    // 🔹 CHANGED: ensure Admin menu shows reactively
    menuItems.push({
      name: "User",
      icon: UserCog,
      path: "/dashboard/manageuser",
    });
  }

  const profileItem: MenuItem = {
    name: user?.name || "User",
    icon: CircleUserRound,
    path: "/dashboard/profile",
  };

  return (
    <>
      {/* 🔹 Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-800 text-white flex items-center justify-between px-4 py-3 shadow z-50">
        <button onClick={() => setMobileOpen(true)}>
          <Menu size={28} />
        </button>
        <div />
      </div>

      {/* 🔹 Overlay */}
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

      {/* 🔹 Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 min-h-screen w-64 bg-gray-800 text-white z-50 shadow-xl flex flex-col"
          >
            <div className="flex justify-end p-4">
              <button onClick={() => setMobileOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <SidebarContent
              isOpen={true}
              menuItems={menuItems}
              profileItem={profileItem}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Desktop Sidebar */}
      <motion.div
        animate={{ width: isOpen ? 260 : 80 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex flex-col h-screen bg-gray-800 text-white shadow-xl"
      >
        {isOpen ? (
          <div className="flex items-center justify-between px-6 mt-4 mb-2">
            <div className="flex items-center gap-3">
              <NavLink to="/dashboard">
                <img
                  src="/jobnestimg.webp"
                  className="w-12 h-12 rounded-full bg-white"
                  alt="logo"
                />
              </NavLink>
              <h1 className="text-xl font-bold">JobNest</h1>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-700 p-2 rounded-full hover:bg-gray-600"
            >
              <Menu size={22} />
            </button>
          </div>
        ) : (
          <div className="flex justify-center mt-4 mb-2">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-gray-700 p-2 rounded-full hover:bg-gray-600"
            >
              <MoveRight size={22} />
            </button>
          </div>
        )}

        {/* 🔹 SidebarContent uses reactive menuItems after user is loaded */}
        <SidebarContent
          isOpen={isOpen}
          menuItems={menuItems}
          profileItem={profileItem}
        />
      </motion.div>
    </>
  );
};

const SidebarContent = ({
  isOpen,
  menuItems,
  profileItem,
}: {
  isOpen: boolean;
  menuItems: MenuItem[];
  profileItem: MenuItem;
}) => {
  return (
    <div className="flex flex-col flex-1 justify-between pt-2">
      {/* 🔹 Menu */}
      <ul className="space-y-2 mt-4 px-2">
        {menuItems.map((item) => (
          <NavLink key={item.path} to={item.path} end>
            {({ isActive }) => (
              <li className="relative group">
                <div
                  className={`flex items-center ${
                    isOpen ? "gap-4 px-3 py-3" : "justify-center py-3"
                  } rounded-lg ${
                    isActive ? "bg-orange-500 text-white" : "hover:bg-gray-700"
                  }`}
                >
                  <item.icon size={isOpen ? 22 : 24} />
                  {isOpen && <span>{item.name}</span>}
                </div>

                {!isOpen && (
                  <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100">
                    {item.name}
                  </span>
                )}
              </li>
            )}
          </NavLink>
        ))}
      </ul>

      {/* 🔹 Profile + Logout */}
      <div className="p-2 border-t border-gray-700 space-y-2">
        <NavLink to={profileItem.path}>
          <div className="flex items-center gap-3 px-3 py-3 hover:bg-gray-700 rounded-lg">
            <profileItem.icon size={22} />
            {isOpen && <span>{profileItem.name}</span>}
          </div>
        </NavLink>

        <NavLink to="/dashboard/logout">
          <div className="flex items-center gap-3 px-3 py-3 hover:bg-gray-700 rounded-lg">
            <LogOut size={22} />
            {isOpen && <span>Logout</span>}
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Dashboard_sidebar;
