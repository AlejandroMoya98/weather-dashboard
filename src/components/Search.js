import React, { useState } from 'react';
import './Search.css';

function Search({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim() !== '') {
      onSearch(city); 
    }
  };

  return (
    <div class="search-container">
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(city); }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Introduce una ciudad"
          class="search-input" 
        />
        <button type='submit' class="search-button"> Buscar </button>
     </form>
    </div>
  );
}


export default Search;
