import React from 'react';

import Card from '../../components/Card';
import Search from '../../components/Search';

import { Stack, Grid, Typography, Divider } from '@mui/material';

import { getItems, ItemInterface } from '../../redux/slices/ItemSlice';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';

import styles from './Home.module.scss';

const Home = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.itemsReducer.status);
  const items = useAppSelector((state) => state.itemsReducer.items);
  const searchValue = useAppSelector((state) => state.filterReducer.searchValue);

  // unused params for server request
  const params = {
    searchValue,
  };

  // Search and title sort
  const filterFunc = () => {
    return items
      .filter((item) => {
        const title = item.title.toLowerCase();
        const summary = item.summary.toLowerCase();
        return (
          title.includes(searchValue.toLowerCase()) || summary.includes(searchValue.toLowerCase())
        );
      })
      .sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (
          titleA.includes(searchValue.toLowerCase()) === titleB.includes(searchValue.toLowerCase())
        ) {
          return 0;
        }
        return titleA.includes(searchValue.toLowerCase()) ? -1 : 1;
      });
  };

  // Server request
  React.useEffect(() => {
    dispatch(getItems(params));
  }, []);
  console.log(items);

  return (
    <Stack spacing={2}>
      <Search />

      <Typography mt={40} className={styles.resultsQuantity}>
        Result:{filterFunc().length}
      </Typography>

      <Divider className={styles.divider} component="div" />
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyItems="center"
        alignItems="center">
        {filterFunc().map((obj) => (
          <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card {...obj} key={obj.id} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default Home;
