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

import { ApiError, BooksService, CartsService, BookOut } from '../services/elibraryAPI';

const { booksApiCollectBook } = BooksService;
const { cartsApiPutCart } = CartsService;

interface IBookProp {
  book: BookOut
  isCollect: boolean
  setCartCnt: React.Dispatch<React.SetStateAction<number>>
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

  const handleAddCart = (): void => {
    cartsApiPutCart({book_id: props.book.id, price: props.book.price, amount: 1})
      .then(() => {
        props.setCartCnt((preVal) => preVal + 1)
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
            image={props.book.image_url ?? "/imgNotFound.png"}
            alt="imgNotFound"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              $ {props.book.price} NTD
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
            <IconButton aria-label="add-cart" onClick={handleAddCart}>
              <AddShoppingCartIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
