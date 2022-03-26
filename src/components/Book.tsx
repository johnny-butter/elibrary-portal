import React, { useState, useEffect } from 'react';

import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Typography,
  IconButton,
} from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { ApiError, BooksService, BookOut } from '../services/elibraryAPI';

const { booksApiCollectBook } = BooksService;

interface IBookProp {
  book: BookOut
  isCollect: boolean
}

export const Book = (props: IBookProp) => {
  const [isCollect, setIsCollect] = useState(false);

  useEffect(() => {
    setIsCollect(props.isCollect);
  }, [props.isCollect]);

  const handleCollectBook = (): void => {
    booksApiCollectBook(props.book.id)
      .then(() => {
        setIsCollect(!isCollect);
      })
      .catch((err: ApiError) => console.error(err));
  };

  const collectBtn = isCollect ? <FavoriteIcon /> : <FavoriteBorderIcon />;

  return (
    <React.Fragment>
      <Grid item xs={4}>
        <Card sx={{ height: 1 }}>
          <CardHeader
            title={props.book.name}
            subheader={props.book.author}
          />
          <CardMedia
            component="img"
            sx={{ height: 170, width: 170 }}
            image="/imgNotFound.png"
            alt="imgNotFound"
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
