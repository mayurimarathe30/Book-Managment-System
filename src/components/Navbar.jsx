import { Link, NavLink } from "react-router-dom";

/**
 * Navbar - Dashboard-style top navigation
 */
const Navbar = () => {
  const linkClass = ({ isActive }) =>
    `px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
        : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-[0_1px_12px_rgba(59,130,246,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 sm:py-5">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xl shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/40 transition-shadow duration-300">
              📚
            </div>
            <div>
              <span className="block text-lg font-bold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                Library Dashboard
              </span>
              <span className="block text-xs font-medium text-slate-500">
                Book Management System
              </span>
            </div>
          </Link>
          <nav className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-50/80 border border-slate-100">
            <NavLink to="/" end className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/add" className={linkClass}>
              + Add Book
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
