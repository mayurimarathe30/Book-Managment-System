import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getBooks, deleteBook } from "../services/bookService";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";
import Loader from "../components/Loader";
import ConfirmModal from "../components/ConfirmModal";

/**
 * Home Page - Lists all books with search, filter, and delete
 */
const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [bookToDelete, setBookToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBooks();
      // Newest books first (MockAPI returns oldest first)
      const sortedBooks = [...data].reverse();
      setBooks(sortedBooks);
    } catch (err) {
      setError("Failed to load books. Please try again later.");
      toast.error("Failed to fetch books");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!bookToDelete) return;

    try {
      setDeleteLoading(true);
      await deleteBook(bookToDelete.id);
      setBooks((prev) => prev.filter((b) => b.id !== bookToDelete.id));
      toast.success(`"${bookToDelete.title}" deleted successfully`);
      setBookToDelete(null);
    } catch (err) {
      toast.error("Failed to delete book");
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const genres = [...new Set(books.map((b) => b.genre).filter(Boolean))].sort();

  const filteredBooks = books.filter((book) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      book.title?.toLowerCase().includes(query) ||
      book.author?.toLowerCase().includes(query);
    const matchesGenre = !selectedGenre || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="dashboard-card text-center py-16 px-6">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500 mb-4">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-red-600 font-medium mb-6">{error}</p>
        <button onClick={fetchBooks} className="dashboard-btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">
            Dashboard
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
            Book Library
          </h1>
          <p className="text-slate-500 mt-2 text-base max-w-xl">
            Manage your collection — search, filter, and organize all books in one place.
          </p>
        </div>
        <Link to="/add" className="dashboard-btn-primary shrink-0 self-start lg:self-auto">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Book
        </Link>
      </div>

      {/* Stats row */}
      {books.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="dashboard-card p-5 sm:p-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Books</p>
            <p className="text-3xl font-bold text-slate-800 mt-2">{books.length}</p>
          </div>
          <div className="dashboard-card p-5 sm:p-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Showing</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{filteredBooks.length}</p>
          </div>
          <div className="dashboard-card p-5 sm:p-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Genres</p>
            <p className="text-3xl font-bold text-slate-800 mt-2">{genres.length}</p>
          </div>
        </div>
      )}

      {/* Search & filter panel */}
      {books.length > 0 && (
        <div className="dashboard-card p-5 sm:p-6">
          <h2 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </span>
            Search & Filter
          </h2>
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">
            <div className="flex-1">
              <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            </div>
            <GenreFilter
              genres={genres}
              selectedGenre={selectedGenre}
              onGenreChange={setSelectedGenre}
            />
          </div>
        </div>
      )}

      {/* Empty state */}
      {books.length === 0 && (
        <div className="dashboard-card text-center py-20 px-6 border-dashed border-2 border-blue-100">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl mb-6">
            📖
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">No books in library</h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            Your library is empty. Add your first book to get started with the dashboard.
          </p>
          <Link to="/add" className="dashboard-btn-primary">
            Add Your First Book
          </Link>
        </div>
      )}

      {/* No filter results */}
      {books.length > 0 && filteredBooks.length === 0 && (
        <div className="dashboard-card text-center py-16 px-6">
          <p className="text-slate-600 font-medium">No books match your search or filter.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedGenre("");
            }}
            className="mt-5 text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Book grid */}
      {filteredBooks.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-5">
            All Books
            <span className="ml-2 text-slate-400 font-medium normal-case">
              (newest first)
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onDeleteClick={setBookToDelete}
              />
            ))}
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!bookToDelete}
        title="Delete Book"
        message={
          bookToDelete
            ? `Are you sure you want to delete "${bookToDelete.title}"? This action cannot be undone.`
            : ""
        }
        onConfirm={handleDeleteConfirm}
        onCancel={() => setBookToDelete(null)}
        loading={deleteLoading}
      />
    </div>
  );
};

export default Home;
