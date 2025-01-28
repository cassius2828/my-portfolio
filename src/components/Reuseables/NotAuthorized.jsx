import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">403 - Not Authorized</h1>
        <p className="mb-6 text-lg">
          Sorry, you don’t have permission to access this page.
        </p>
        <Link
          to={"/"}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotAuthorized;
