import "./SearchUserInput.css";

export default function SearchUserInput({
  searchText,
  onSearchChange,
  stateSearchButton,
  setSearchText,
}) {
  return (
    <input
      id="search-user-input"
      name="search-text"
      placeholder="Поиск"
      type="text"
      autoComplete="off"
      value={searchText}
      onChange={onSearchChange}
    />
  );
}

