import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const CountryGrid = ({ countries, handleFavorite, favorites, handleRowClick }) => {
  const columns = [
    {
      headerName: "Flag",
      field: "flags",
      cellRenderer: params => {
        const flagUrl = params.data.flags?.png || params.data.flags?.svg;
        return flagUrl ? <img src={flagUrl} alt="flag" width="32" /> : 'N/A';
      }
    },
    { headerName: "Name", field: "name.common" },
    { headerName: "Population", field: "population" },
    {
      headerName: "Languages",
      field: "languages",
      valueGetter: params => params.data.languages ? Object.values(params.data.languages).join(', ') : ''
    },
    {
      headerName: "Currencies",
      field: "currencies",
      valueGetter: params => params.data.currencies ? Object.values(params.data.currencies).map(curr => curr.name).join(', ') : ''
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: params => {
        const isFavorite = favorites.some(fav => fav.cca3 === params.data.cca3);
        return (
          <button onClick={() => handleFavorite(params.data)}>
            {isFavorite ? 'Unfavorite' : 'Favorite'}
          </button>
        );
      }
    }
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
      <AgGridReact
        rowData={countries}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
        onRowClicked={handleRowClick}
      />
    </div>
  );
};

export default CountryGrid;
