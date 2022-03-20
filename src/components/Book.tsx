import React, { useState } from 'react';

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Chip,
  Typography,
  IconButton,
} from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { BookOut } from '../services/elibraryAPI';

interface IBookProp {
  book: BookOut
  isCollect?: boolean
}

export const Book = (props: IBookProp) => {
  const [isCollect, setCollect] = useState(props.isCollect || false);

  const handleCollectBook = (): void => {
    setCollect(!isCollect);
  };

  const collectBtn = isCollect ? <FavoriteIcon /> : <FavoriteBorderIcon />;

  return (
    <React.Fragment>
      <Grid item spacing={2} xs={6}>
        <Card key={props.book.id} sx={{ height: 1 }}>
          <CardHeader
            title={props.book.name}
            subheader={props.book.author}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              {props.book.price} TWD
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {props.book.stock} available
            </Typography>
          </CardContent>
          <CardActions>
            <Chip label={props.book.type} variant="outlined" />
          </CardActions>
          <CardActions disableSpacing sx={{ justifyContent: 'end' }}>
            <IconButton aria-label="collect-book" onClick={handleCollectBook}>
              {collectBtn}
            </IconButton>
            <IconButton aria-label="add-to-cart">
              <AddShoppingCartIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
