// import { Navigate } from "react-router";
// import { useAuth } from "@/context/AuthContext";

// const ProtectedRoute = ({ children, role }: any) => {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to="/" replace />;
//   }

//   // ✅ Role check
//   if (role && user.role !== role) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// };
// export default ProtectedRoute;
import { Navigate } from "react-router";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children, role }: any) => {
  const { user, loading } = useAuth(); //

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ✅ Role check
  if (role && user.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
