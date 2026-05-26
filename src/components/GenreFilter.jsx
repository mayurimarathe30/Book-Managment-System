/**
 * GenreFilter - Dropdown to filter books by genre
 */
const GenreFilter = ({ genres, selectedGenre, onGenreChange }) => {
  return (
    <div className="w-full sm:w-auto sm:min-w-[200px]">
      <label htmlFor="genre-filter" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
        Genre
      </label>
      <div className="relative">
        <select
          id="genre-filter"
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
          className="dashboard-input appearance-none cursor-pointer pr-10"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default GenreFilter;
