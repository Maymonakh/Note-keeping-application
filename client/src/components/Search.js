import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <Grid spacing={2}>
       <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </Grid>
  );
};

export default Search;
