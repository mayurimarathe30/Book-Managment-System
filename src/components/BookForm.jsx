import { useState } from "react";

/**
 * BookForm - Reusable form for adding and editing books
 * Validates: all fields required, publicationYear must be a number
 */
const BookForm = ({ initialData = {}, onSubmit, submitLabel = "Save Book", loading }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    author: initialData.author || "",
    genre: initialData.genre || "",
    publicationYear: initialData.publicationYear?.toString() || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.author.trim()) {
      newErrors.author = "Author is required";
    }
    if (!formData.genre.trim()) {
      newErrors.genre = "Genre is required";
    }
    if (!formData.publicationYear.trim()) {
      newErrors.publicationYear = "Publication year is required";
    } else if (isNaN(Number(formData.publicationYear))) {
      newErrors.publicationYear = "Publication year must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: formData.title.trim(),
      author: formData.author.trim(),
      genre: formData.genre.trim(),
      publicationYear: Number(formData.publicationYear),
    });
  };

  const inputClass = (field) =>
    `dashboard-input ${errors[field] ? "!border-red-300 !ring-red-200 focus:!ring-red-200 focus:!border-red-400" : ""}`;

  const labelClass = "block text-sm font-semibold text-slate-700 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <div>
        <label htmlFor="title" className={labelClass}>
          Book Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter book title"
          className={inputClass("title")}
        />
        {errors.title && (
          <p className="mt-2 text-sm text-red-600 font-medium">{errors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="author" className={labelClass}>
          Author Name <span className="text-red-500">*</span>
        </label>
        <input
          id="author"
          name="author"
          type="text"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter author name"
          className={inputClass("author")}
        />
        {errors.author && (
          <p className="mt-2 text-sm text-red-600 font-medium">{errors.author}</p>
        )}
      </div>

      <div>
        <label htmlFor="genre" className={labelClass}>
          Genre <span className="text-red-500">*</span>
        </label>
        <input
          id="genre"
          name="genre"
          type="text"
          value={formData.genre}
          onChange={handleChange}
          placeholder="e.g. Fiction, Science, History"
          className={inputClass("genre")}
        />
        {errors.genre && (
          <p className="mt-2 text-sm text-red-600 font-medium">{errors.genre}</p>
        )}
      </div>

      <div>
        <label htmlFor="publicationYear" className={labelClass}>
          Publication Year <span className="text-red-500">*</span>
        </label>
        <input
          id="publicationYear"
          name="publicationYear"
          type="text"
          value={formData.publicationYear}
          onChange={handleChange}
          placeholder="e.g. 2024"
          className={inputClass("publicationYear")}
        />
        {errors.publicationYear && (
          <p className="mt-2 text-sm text-red-600 font-medium">{errors.publicationYear}</p>
        )}
      </div>

      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={loading}
          className="dashboard-btn-primary w-full sm:w-auto min-w-[160px]"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Saving...
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
};

export default BookForm;
