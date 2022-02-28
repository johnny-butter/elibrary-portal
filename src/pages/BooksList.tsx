import { useState, useEffect } from 'react';

import { useCookie } from 'react-use';

import { ApiError, BooksService, BookOut, PaginatedBooksOut } from '../services/elibraryAPI';

import { Page } from './Page'
import { Book } from '../components';

import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="books">
        <TableHead>
          <TableRow>
            <TableCell align="center">Book</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Author</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Sale</TableCell>
            <TableCell align="center">Stock</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { books.map((book: BookOut) => <Book book={book}></Book>) }
        </TableBody>
      </Table>

      <br />

      <Stack spacing={2} alignItems="center">
        <Pagination count={totalPages} variant="outlined" shape="rounded" onChange={handlePageChange} />
      </Stack>
    </TableContainer>
  )

  return (
    <Page content={booksList}></Page>
  );
}
