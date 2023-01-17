import React from 'react';

import {
  Card as MuiCard,
  Stack,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Link } from 'react-router-dom';

import { ItemInterface } from './../../redux/slices/ItemSlice';

import { useHighlight } from '../../utils/useHighlight';

import styles from './Card.module.scss';
const Card: React.FC<ItemInterface> = ({ title, imageUrl, summary, id }) => {
  //Make search value highlighted
  const highlightedTitle = useHighlight(title);
  const highlightedSummary = useHighlight(summary.slice(0, 100).trim());

  return (
    <MuiCard
      sx={{
        maxWidth: 375,
        height: 530,
        position: 'relative',
      }}>
      <CardMedia sx={{ height: 217 }} image={imageUrl} />
      <CardContent>
        <Stack spacing={1} direction="row" alignItems="center" className={styles.date}>
          <CalendarTodayIcon className={styles.dateImg} />
          <Typography>29.10.12</Typography>
        </Stack>

        <Typography className={styles.title}>{highlightedTitle}</Typography>
        <Typography className={styles.descriprion}>{highlightedSummary}...</Typography>
      </CardContent>
      <CardActions
        sx={{
          position: 'absolute',
          bottom: 0,
        }}>
        <Link to={`/item/${id}`}>
          <Button
            size="small"
            variant="text"
            endIcon={<ArrowForwardIcon />}
            className={styles.readMore}>
            Read more
          </Button>
        </Link>
      </CardActions>
    </MuiCard>
  );
};

export default Card;
