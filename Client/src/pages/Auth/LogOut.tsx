// import { useEffect } from "react";

// import { useNavigate } from "react-router";

// const LogOut = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     localStorage.removeItem("token");
//     sessionStorage.clear();

//     const timer = setTimeout(() => {
//       navigate("/", { replace: true });
//     }, 100);

//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return null;
// };

// export default LogOut;
import { useEffect } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

const LogOut = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const logout = async () => {
      try {
        await axiosInstance.post("/logout", {}, { withCredentials: true });
      } catch (err) {
        console.error("Logout failed:", err);
      } finally {
        setUser(null); // 🔹 remove user from context
        navigate("/", { replace: true });
      }
    };

    logout();
  }, [navigate, setUser]);

  return null;
};

export default LogOut;
