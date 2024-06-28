import React from 'react';
import { AgGridReact } from 'ag-grid-react';

const CountryGrid = ({ countries, handleFavorite, favorites }) => {
  const columns = [
    {
      headerName: "Flag",
      field: "flag",
      cellRendererFramework: params => {
        <img src={"https://flagcdn.com/w320/${params.data.cca2}.png"} alt="flag" width="32" />
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
      cellRendererFramework: params => (
        <button onClick={() => handleFavorite(params.data)}>
          {favorites.some(fav => fav.cca3 === params.data.cca3) ? 'Unfavorite' : 'Favorite'}
        </button>
      )
    }
  ];

  return (
    <div className="ag-theme-alpine grid-container">
      <AgGridReact
        rowData={countries}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
        onRowClicked={event => alert(`Clicked on ${event.data.name.common}`)}
      />
    </div>
  );
};

export default CountryGrid;
