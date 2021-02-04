import React from 'react';

export default function SearchBar({ handleShow, onSearch, handleSearch }) {
  const handleChange = ({ currentTarget }) => {
    onSearch(currentTarget.value);
  };

  return (
    <div className="searchbar">
      <form className="search-group" onSubmit={handleSearch}>
        <div className="search">
          <i className="fas fa-search"></i>
        </div>
        <input
          type="search"
          placeholder="Search here"
          onChange={handleChange}
        />
      </form>

      <button className="btn btn-search" onClick={handleShow}>
        <i className="fas fa-plus"></i> Add todo
      </button>
    </div>
  );
}
