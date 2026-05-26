import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

/**
 * App - Root component with router, navbar, and toast notifications
 */
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <AppRoutes />
        </main>
        <footer className="mt-auto border-t border-slate-200/80 bg-white/70 backdrop-blur-sm py-5 text-center text-sm text-slate-500">
          <span className="font-medium text-slate-600">Book Management System</span>
          <span className="mx-2 text-slate-300">|</span>
          &copy; {new Date().getFullYear()} Library Dashboard
        </footer>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
        toastClassName="!rounded-xl !shadow-lg !font-medium"
      />
    </BrowserRouter>
  );
}

export default App;
