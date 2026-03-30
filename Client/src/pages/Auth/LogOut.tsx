import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

const LogOut = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const logout = async () => {
      try {
        await axiosInstance.post("/logout", {}, { withCredentials: true });
        toast.success("Logged out successfully");
      } catch (err) {
        toast.error("Failed to log out");
      } finally {
        setUser(null);
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 800);
      }
    };

    logout();
  }, [navigate, setUser]);

  return null;
};

export default LogOut;
