/**
 * ConfirmModal - Dashboard-style confirmation dialog
 */
const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, loading }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className="dashboard-card max-w-md w-full p-8 animate-[fadeIn_0.2s_ease-out]">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500 mb-5">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h2 id="confirm-title" className="text-xl font-bold text-slate-800 mb-2">
          {title}
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-8">{message}</p>
        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="dashboard-btn-secondary disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm shadow-md shadow-red-500/25 hover:bg-red-600 hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete Book"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
