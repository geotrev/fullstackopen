export const Filter = ({ searchValue, handleSearchChange }) => {
  return (
    <div>
      Filter people by name:{" "}
      <input
        type="search"
        name="filter"
        value={searchValue}
        onChange={handleSearchChange}
      />
    </div>
  );
};
