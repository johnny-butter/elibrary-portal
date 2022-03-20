import { useState, useEffect } from 'react';

import { useCookie } from 'react-use';

import { ApiError, BooksService, BookOut, PaginatedBooksOut } from '../services/elibraryAPI';

import { Page } from './Page'
import { Book } from '../components';

import {
  Grid,
  Stack,
  Pagination,
} from '@mui/material';

const { booksApiBooks } = BooksService;

export const BooksList = (): JSX.Element => {
  const [token, , ] = useCookie("token");

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState<BookOut[]>([]);

  useEffect(() => {
    booksApiBooks(page)
      .then((paginatedBooksOut: PaginatedBooksOut) => {
        setTotalPages(paginatedBooksOut.total_pages);
        setBooks(paginatedBooksOut.data);
      })
      .catch((err: ApiError) => console.log(err))
  }, [token, page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const booksList = (
    <Grid
      container
      spacing={2}
    >
      { books.map((book: BookOut) => <Book book={book}></Book>) }
      <Grid item xs={12}>
        <Stack spacing={2} paddingBottom={5} alignItems="center">
          <Pagination count={totalPages} variant="outlined" shape="rounded" onChange={handlePageChange} />
        </Stack>
      </Grid>
    </Grid>
  )

  return (
    <Page content={booksList}></Page>
  );
}
