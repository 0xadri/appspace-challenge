const FilterSort = ({
  searchTerm,
  handleChangeSearchTerm,
  sortOrder,
  toggleSortOrder,
}) => {
  return (
    <div className="filter-sort">
      <input
        type="text"
        name="searchTerm"
        id="searchTerm"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleChangeSearchTerm}
        className="search-box"
      />
      <input
        type="button"
        value={sortOrder}
        onClick={toggleSortOrder}
        className="sorting-toggle-btn"
      />
    </div>
  );
};

export default FilterSort;
