/**
 * Loader - Dashboard-style loading spinner
 */
const Loader = ({ message = "Loading books..." }) => {
  return (
    <div className="dashboard-card flex flex-col items-center justify-center py-20 gap-5">
      <div className="relative">
        <div className="h-14 w-14 rounded-full border-4 border-blue-100" />
        <div
          className="absolute inset-0 h-14 w-14 animate-spin rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-400"
          role="status"
          aria-label="Loading"
        />
      </div>
      <p className="text-slate-600 text-sm font-semibold tracking-wide">{message}</p>
    </div>
  );
};

export default Loader;
