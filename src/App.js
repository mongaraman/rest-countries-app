import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

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
    if (favorites.some(fav => fav.cca3 === country.cca3)) {
      setFavorites(prevFavorites => prevFavorites.filter(fav => fav.cca3 !== country.cca3));
    } else {
      setFavorites(prevFavorites => [...prevFavorites, country]);
    }
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm) ||
    Object.values(country.languages || {}).some(language => language.toLowerCase().includes(searchTerm)) ||
    Object.values(country.currencies || {}).some(currency => currency.name.toLowerCase().includes(searchTerm))
  );

  const columns = [
    { headerName: "Flag", field: "flags", cellRendererFramework: params => <img src={params.data.flags.png} alt="flag" width="32" /> },
    { headerName: "Name", field: "name.common" },
    { headerName: "Population", field: "population" },
    { headerName: "Languages", field: "languages", valueGetter: params => params.data.languages ? Object.values(params.data.languages).join(', ') : '' },
    { headerName: "Currencies", field: "currencies", valueGetter: params => params.data.currencies ? Object.values(params.data.currencies).map(curr => curr.name).join(', ') : '' },
    {
      headerName: "Actions", field: "actions", cellRendererFramework: params => (
        <button onClick={() => handleFavorite(params.data)}>
          {favorites.some(fav => fav.cca3 === params.data.cca3) ? 'Unfavorite' : 'Favorite'}
        </button>
      )
    }
  ];

  return (
    <div className="app">
      <input type="text" placeholder="Search by name, language, or currency" onChange={handleSearch} className="search-input" />
      <div className="ag-theme-alpine grid-container">
        <AgGridReact
          rowData={filteredCountries}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
          domLayout="autoHeight"
          onRowClicked={event => alert(`Clicked on ${event.data.name.common}`)}
        />
      </div>
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
