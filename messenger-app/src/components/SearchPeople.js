import React, { useState } from 'react';

function Search() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Handle search logic here
  };

  return (
    <div className="search">
      <h2>Search</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Search;
