import { Link } from "react-router-dom";

/**
 * NotFound Page - 404 fallback route
 */
const NotFound = () => {
  return (
    <div className="dashboard-card text-center py-20 sm:py-24 px-6 max-w-lg mx-auto">
      <p className="text-7xl sm:text-8xl font-bold bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
        404
      </p>
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">Page Not Found</h1>
      <p className="text-slate-500 mb-10 leading-relaxed">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="dashboard-btn-primary">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
