import { Card, Grid, Stack, TextField, Typography, InputAdornment } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

import { setSearchValue } from '../../redux/slices/FilterSlice';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

import { debounce } from 'lodash';

import styles from './Search.module.scss';

const Search = () => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.filterReducer.searchValue);
  const [value, setValue] = React.useState<string>('');

  // To get data from server with params usage
  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 1000),
    [],
  );

  const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <Stack>
      <Typography className={styles.header}>Filter by keywords</Typography>
      <TextField
        className={styles.searchField}
        value={value}
        onChange={handleSearchValue}
        placeholder="The most successful IT companies in 2020"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}></TextField>

      <Grid>
        <Card></Card>
      </Grid>
    </Stack>
  );
};

export default Search;
