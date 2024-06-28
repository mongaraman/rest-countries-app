import React from 'react';

const SearchBar = ({ handleSearch }) => (
  <input
    type="text"
    placeholder="Search by name, language, or currency"
    onChange={handleSearch}
    className="search-input"
  />
);

export default SearchBar;
