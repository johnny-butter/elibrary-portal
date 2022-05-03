import { useState, useEffect } from 'react';

import { useCookie } from 'react-use';

import { ApiError, BooksService, BookOut, PaginatedBooksOut } from '../services/elibraryAPI';

import { Page } from './Page'
import { Book } from '../components';

import {
  AlertColor,
  Grid,
  Stack,
  Pagination,
  CircularProgress,
} from '@mui/material';

const { booksApiBooks, booksApiCollectedBooksIds } = BooksService;

export const BooksList = (): JSX.Element => {
  const [token, , ] = useCookie("token");

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState<BookOut[] | undefined>(undefined);
  const [collectedBooksIds, setCollectedBooksIds] = useState<number[]>([]);

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

  useEffect(() => {
    booksApiBooks(page)
      .then((paginatedBooksOut: PaginatedBooksOut) => {
        setTotalPages(paginatedBooksOut.total_pages);
        setBooks(paginatedBooksOut.data);
      })
      .catch((err: ApiError) => console.log(err))
  }, [token, page]);

  useEffect(() => {
    if (!token) return;

    booksApiCollectedBooksIds()
      .then((collectedBooksIds: number[]) => {
        setCollectedBooksIds(collectedBooksIds);
      })
      .catch((err: ApiError) => console.log(err))
  }, [token]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  let booksList = books !== undefined ? (
    books.map((book: BookOut): JSX.Element => {
      let isCollect = collectedBooksIds.includes(book.id);

      return (
        <Book
          book={book}
          isCollect={isCollect}
          setCartCnt={setCartCnt}
          notifyProp={{
            setSeverity: setNotifySeverity,
            setContent: setNotifyContent,
            setOpen: setNotifyOpen,
          }} />
      )
    })
  ) : (
    <Grid item xs={12}>
      <Stack alignItems="center">
        <CircularProgress />
      </Stack>
    </Grid>
  );

  const booksPage = (
    <Grid
      container
      spacing={2}
    >
      {booksList}
      <Grid item xs={12}>
        <Stack spacing={2} paddingBottom={5} alignItems="center">
          <Pagination count={totalPages} variant="outlined" shape="rounded" onChange={handlePageChange} />
        </Stack>
      </Grid>
    </Grid>
  )

  return (
    <Page content={booksPage} navbarProp={{cartCnt: cartCnt, setCartCnt: setCartCnt}} notifybarProp={notifyBarProp}></Page>
  );
}
