import React, { useState } from 'react';

function Search({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim() !== '') {
      onSearch(city); 
    }
  };

  return (
    <div style={searchStyle}>
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(city); }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Introduce una ciudad"
          style={inputStyle}
        />
        <button type='submit' style={buttonStyle}> Buscar </button>
     </form>
    </div>
  );
}

const searchStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '0.5rem',
  margin: '1rem 0',
};

const inputStyle = {
  padding: '0.5rem',
  fontSize: '1rem',
};

const buttonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

export default Search;
