/**
 * SearchBar - Filter books by title or author
 */
const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="relative w-full">
      <label htmlFor="search" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
        Search
      </label>
      <div className="relative">
         
        <input
          id="search"
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="dashboard-input pl-12"
        />
      </div>
    </div>
  );
};

export default SearchBar;
