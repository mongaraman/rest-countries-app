import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CountryGrid from './components/CountryGrid';
import SearchBar from './components/SearchBar';
import CountryDetailModal from './components/CountryDetailModal';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = event => setSearchTerm(event.target.value.toLowerCase());

  const handleFavorite = country => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.cca3 === country.cca3);
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.cca3 !== country.cca3);
      } else {
        return [...prevFavorites, country];
      }
    });
  };

  const handleRowClick = event => {
    setSelectedCountry(event.data);
  };

  const closeModal = () => {
    setSelectedCountry(null);
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm) ||
    Object.values(country.languages || {}).some(language => language.toLowerCase().includes(searchTerm)) ||
    Object.values(country.currencies || {}).some(currency => currency.name.toLowerCase().includes(searchTerm))
  );

  return (
    <div className="app">
      <SearchBar handleSearch={handleSearch} />
      <CountryGrid
        countries={filteredCountries}
        handleFavorite={handleFavorite}
        favorites={favorites}
        handleRowClick={handleRowClick}
      />
      {selectedCountry && (
        <CountryDetailModal
          country={selectedCountry}
          onClose={closeModal}
        />
      )}
      <h2>Favorites</h2>
      <ul className="favorites-list">
        {favorites.map(fav => (
          <li key={fav.cca3}>{fav.name.common}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
