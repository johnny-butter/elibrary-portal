import { useState, useEffect } from 'react';

import { ApiError, BooksService, BookOut } from '../services/elibraryAPI';

import { Page } from './Page'
import { Book } from '../components';

import {
  AlertColor,
  Grid,
  Stack,
} from '@mui/material';

const { booksApiCollectedBooks } = BooksService;

export const CollectedBooksList = (): JSX.Element => {
  const [books, setBooks] = useState<BookOut[]>([]);

  const [cartCnt, setCartCnt] = useState(0);

  const [notifySeverity, setNotifySeverity] = useState('success' as AlertColor);
  const [notifyContent, setNotifyContent] = useState('');
  const [notifyOpen, setNotifyOpen] = useState(false);

  let notifyBarProp = {
    severity: notifySeverity,
    content: notifyContent,
    open: notifyOpen,
    setOpen: setNotifyOpen,
  };

  let booksList: JSX.Element = <h2>NO COLLECTED BOOKS</h2>;

  if (books.length > 0) {
    booksList = (
      <Grid
        container
        spacing={2}
      >
      <Grid item xs={12}>
        <Stack alignItems="center">
          <h2>COLLECTED BOOKS</h2>
        </Stack>
      </Grid>
        { books.map((book: BookOut): JSX.Element => {
          return <Book
            book={book}
            isCollect={true}
            setCartCnt={setCartCnt}
            notifyProp={{
              setSeverity: setNotifySeverity,
              setContent: setNotifyContent,
              setOpen: setNotifyOpen,
            }} />
        }) }
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
    <Page content={booksList} navbarProp={{cartCnt: cartCnt, setCartCnt: setCartCnt}} notifybarProp={notifyBarProp}></Page>
  );
}
