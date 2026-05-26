import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getBooks, updateBook } from "../services/bookService";
import BookForm from "../components/BookForm";
import Loader from "../components/Loader";

/**
 * EditBook Page - Load book by id and update via PUT API
 */
const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError(null);
        const books = await getBooks();
        const found = books.find((b) => String(b.id) === String(id));
        if (!found) {
          setError("Book not found");
          return;
        }
        setBook(found);
      } catch (err) {
        setError("Failed to load book");
        toast.error("Failed to fetch book details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (bookData) => {
    try {
      setSaving(true);
      await updateBook(id, bookData);
      toast.success("Book updated successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to update book. Please try again.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader message="Loading book details..." />;
  }

  if (error) {
    return (
      <div className="dashboard-card text-center py-16 px-6 max-w-lg mx-auto">
        <p className="text-red-600 font-medium mb-6">{error}</p>
        <Link to="/" className="dashboard-btn-primary">
          Back to Dashboard
        </Link>
      </div>
    );
  }

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
          Edit Entry
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
          Edit Book
        </h1>
        <p className="text-slate-500 mt-2">
          Update the details for &quot;{book.title}&quot;
        </p>
      </div>
      <div className="dashboard-card p-6 sm:p-10">
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div>
            <h2 className="font-bold text-slate-800">Update Information</h2>
            <p className="text-sm text-slate-500">Modify book details below</p>
          </div>
        </div>
        <BookForm
          initialData={book}
          onSubmit={handleSubmit}
          submitLabel="Update Book"
          loading={saving}
        />
      </div>
    </div>
  );
};

export default EditBook;
