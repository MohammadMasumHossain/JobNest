import { Navigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import AccessDenied from "./AccessDenied";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
  role?: string;
};

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    if (!loading && !user && !toastShown) {
      toast.error("Access Token expired . Please login again.");
      setToastShown(true);
    }
  }, [loading, user, toastShown]);
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

  if (role && user.role !== role) {
    return <AccessDenied />;
  }

  return children;
};

export default ProtectedRoute;
