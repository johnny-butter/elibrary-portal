import { useState, useEffect } from 'react';

import { ApiError, BooksService, BookOut } from '../services/elibraryAPI';

import { Page } from './Page'
import { Book } from '../components';

import {
  Grid,
  Stack,
} from '@mui/material';

const { booksApiCollectedBooks } = BooksService;

export const CollectedBooksList = (): JSX.Element => {
  const [books, setBooks] = useState<BookOut[]>([]);

  const [cartCnt, setCartCnt] = useState(0);

  let booksList: JSX.Element = <h2>NO COLLECTED BOOKS</h2>;

  if (books.length > 0) {
    booksList = (
      <Grid
        container
        spacing={2}
      >
      <Grid item xs={12}>
        <Stack alignItems="center">
          <h2>FAVORITE BOOKS</h2>
        </Stack>
      </Grid>
        { books.map((book: BookOut): JSX.Element => <Book book={book} isCollect={true} setCartCnt={setCartCnt}></Book>) }
      </Grid>
    )
  }

  useEffect(() => {
    booksApiCollectedBooks()
      .then((respBooks: BookOut[]) => {
        setBooks(respBooks);
      })
      .catch((err: ApiError) => console.log(err))
  }, []);

  return (
    <Page content={booksList} navbarProp={{cartCnt: cartCnt, setCartCnt: setCartCnt}}></Page>
  );
}
