import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router";

interface ErrorPageProps {
  statusCode?: number;
  message?: string;
  homeLink?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  statusCode = 404,
  message = "Oops! Something went wrong.",
}) => {
  const [animationData, setAnimationData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://lottie.host/545e6875-fe97-400e-afd2-6fc85c5cc424/oRm3UsJpzg.json",
    )
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load Lottie animation", err));
  }, []);

  if (!animationData)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 text-center">
      <div className="w-72 md:w-96 mb-6">
        <Lottie animationData={animationData} loop autoplay />
      </div>
      <h1 className="text-6xl font-bold text-gray-800 mb-2">{statusCode}</h1>
      <p className="text-gray-600 text-lg mb-6">{message}</p>
      <a
        onClick={() => navigate("/dashboard")}
        className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-md shadow-md hover:bg-orange-500 transform hover:-translate-y-1 transition-all duration-300"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default ErrorPage;
