import React from 'react';
import './CountryDetailModal.css';

const CountryDetailModal = ({ country, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{country.name.common}</h2>
        <img src={country.flags.png || country.flags.svg} alt="flag" width="100" />
        <p><strong>Population:</strong> {country.population}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Subregion:</strong> {country.subregion}</p>
        <p><strong>Capital:</strong> {country.capital ? country.capital.join(', ') : 'N/A'}</p>
        <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
        <p><strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map(curr => curr.name).join(', ') : 'N/A'}</p>
      </div>
    </div>
  );
};

export default CountryDetailModal;
