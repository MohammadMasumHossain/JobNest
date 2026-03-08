import { useEffect } from "react";

import { useNavigate } from "react-router";

const LogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    sessionStorage.clear();

    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 100);

    return () => clearTimeout(timer);
  }, [navigate]);

  return null;
};

export default LogOut;
