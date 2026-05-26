import { Link } from "react-router-dom";

/**
 * BookCard - Dashboard-style book card
 */
const BookCard = ({ book, onDeleteClick }) => {
  return (
    <article className="group dashboard-card overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-[0_12px_40px_-8px_rgba(59,130,246,0.2)] hover:border-blue-100">
      <div className="h-1.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600" />
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between gap-3 mb-4">
          <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-100">
            {book.genre}
          </span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-sm font-bold">
            {book.publicationYear?.toString().slice(-2) || "—"}
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-3 line-clamp-2 leading-snug group-hover:text-blue-700 transition-colors duration-200">
          {book.title}
        </h3>
        <div className="space-y-2.5">
          <p className="flex items-center gap-2 text-sm text-slate-600">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <span>
              <span className="font-semibold text-slate-700">Author:</span> {book.author}
            </span>
          </p>
          <p className="flex items-center gap-2 text-sm text-slate-500">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            <span>
              <span className="font-semibold text-slate-600">Year:</span> {book.publicationYear}
            </span>
          </p>
        </div>
      </div>
      <div className="px-6 pb-6 pt-2 flex gap-2 border-t border-slate-50 bg-slate-50/30">
        <Link
          to={`/edit/${book.id}`}
          className="flex-1 text-center dashboard-btn-primary py-2.5 text-sm"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={() => onDeleteClick(book)}
          className="flex-1 dashboard-btn-danger py-2.5 text-sm"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default BookCard;
