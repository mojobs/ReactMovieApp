import React from "react";

export const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div style={{position: 'relative'}}>
        <img src="search.svg" alt="search" style={{position : 'absolute', top : '10px'}} />
      </div>
      <input
        type="text"
        placeholder="Search through thousands of movies"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

//props should never be mutated in the Child component
//states should never be mutated in React
