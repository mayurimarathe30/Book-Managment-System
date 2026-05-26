import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addBook } from "../services/bookService";
import BookForm from "../components/BookForm";

/**
 * AddBook Page - Create a new book via POST API
 */
const AddBook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (bookData) => {
    try {
      setLoading(true);
      await addBook(bookData);
      toast.success("Book added successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to add book. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 mb-4 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">
          New Entry
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
          Add New Book
        </h1>
        <p className="text-slate-500 mt-2">
          Fill in the details below to add a book to your library.
        </p>
      </div>
      <div className="dashboard-card p-6 sm:p-10">
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h2 className="font-bold text-slate-800">Book Information</h2>
            <p className="text-sm text-slate-500">All fields are required</p>
          </div>
        </div>
        <BookForm onSubmit={handleSubmit} submitLabel="Add Book" loading={loading} />
      </div>
    </div>
  );
};

export default AddBook;
