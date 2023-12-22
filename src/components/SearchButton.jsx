const SearchButton = ({ onSearch, search }) => (
  <input
    type="text"
    className="note-search"
    placeholder="Cari Catatan..."
    value={search}
    onChange={onSearch}
  />
);

export default SearchButton;
