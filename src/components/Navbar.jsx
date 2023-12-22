import SearchButton from './SearchButton';

const Navbar = ({ onSearch, search }) => (
  <nav className="note-app__header">
    <h1>Catatan Pribadi</h1>

    <SearchButton
      onSearch={onSearch}
      search={search}
    />
  </nav>
);

export default Navbar;
