import { useEffect } from "react";
import { useNavigate } from "react-router";

const LogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    sessionStorage.clear();

    // Redirect to login page
    navigate("/", { replace: true });
  }, [navigate]);

  return null; // No UI needed
};

export default LogOut;
