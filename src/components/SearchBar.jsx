import React, { useCallback } from 'react';

export default function SearchBar({ handleShow, onSearch }) {
  const handleChange = useCallback(
    ({ currentTarget }) => {
      onSearch(currentTarget.value);
    },
    [onSearch]
  );

  return (
    <div className="searchbar">
      <div className="search-group">
        <div className="search">
          <i className="fas fa-search"></i>
        </div>
        <input
          type="search"
          placeholder="Search here"
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-search" onClick={handleShow}>
        <i className="fas fa-plus"></i> Add todo
      </button>
    </div>
  );
}
