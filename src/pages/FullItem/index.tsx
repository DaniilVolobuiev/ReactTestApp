import React from 'react';
import axios from 'axios';

import { Link, useParams } from 'react-router-dom';
import { ItemInterface } from '../../redux/slices/ItemSlice';

import { AppBar, Button, Paper, Typography, Stack } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import styles from './FullItem.module.scss';

const FullItem: React.FC = () => {
  const { id } = useParams();
  const [item, setItem] = React.useState<any>();

  React.useEffect(() => {
    async function getItemById() {
      try {
        {
          const { data } = await axios.get<ItemInterface>(
            `https://api.spaceflightnewsapi.net/v3/articles/${id}`,
          );
          setItem(data);
        }
      } catch (error) {
        alert('Mistake');
      }
    }
    getItemById();
  }, []);

  if (!item) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <AppBar className={styles.image} sx={{ zIndex: '1' }}>
        <img src={item['imageUrl']} />
      </AppBar>
      <Paper
        elevation={24}
        sx={{
          zIndex: '100',
          position: 'relative',
          padding: '3.5% 5%',
          margin: '35px',
        }}>
        <Stack spacing={3}>
          <Typography className={styles.title}>{item['title']}</Typography>
          <Typography>{item['summary']}</Typography>
        </Stack>
      </Paper>
      <Link to={'/'}>
        <Button startIcon={<ArrowBack />} className={styles.goBack}>
          Back to homepage
        </Button>
      </Link>
    </>
  );
};

export default FullItem;
