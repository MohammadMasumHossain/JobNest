const AccessDenied = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
      <p className="text-lg mb-6">
        You do not have permission to access this page.
      </p>
      <button
        onClick={() => window.history.back()}
        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        Go Back
      </button>
    </div>
  );
};

export default AccessDenied;
