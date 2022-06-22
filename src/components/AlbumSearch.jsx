import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import jsonp from 'jsonp';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';

const searchStyle = {
  margin: '50px auto 0',
  width: '100%',
  maxWidth: 500,
};

function AlbumSearch({ updateListItems }) {
  const [searchInput, setSearchInput] = useState('');
  const [performSearch, setPerformSearch] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      jsonp(`https://itunes.apple.com/search?term=${searchInput}`, null, (err, data) => {
        if (err) {
          console.error(err.message);
          setPerformSearch(false);
        } else {
          setPerformSearch(false);
          updateListItems(data);
        }
      });
    };

    if (searchInput && performSearch) {
      fetchData();
    } else if (!searchInput) {
      updateListItems();
    }
  }, [searchInput, performSearch, setPerformSearch]);

  const searchItems = (searchValue) => {
    if (!searchValue) {
      updateListItems();
    }
    setSearchInput(searchValue);
  }

  const onSearch = (e) => {
    if(e.keyCode == 13){
      setPerformSearch(true);
   }
  }

  return (
    <Input
      sx={searchStyle}
      placeholder="Search"
      startAdornment={
        <InputAdornment position="start">
          <Search />
        </InputAdornment>
      }
      onChange={(e) => searchItems(e.target.value)}
      value={searchInput}
      onKeyDown={onSearch}
    />
  );
}

AlbumSearch.propTypes = {
  updateListItems: PropTypes.func.isRequired,
};

export default AlbumSearch;
