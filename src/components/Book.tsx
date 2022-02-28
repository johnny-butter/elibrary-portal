import React from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { BookOut } from '../services/elibraryAPI';

interface IBookProp {
  book: BookOut
}

export const Book = (props: IBookProp) => {
  return (
    <React.Fragment>
      <TableRow
        key={props.book.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell align="left">{props.book.name}</TableCell>
        <TableCell align="center">{props.book.type}</TableCell>
        <TableCell align="center">{props.book.author}</TableCell>
        <TableCell align="center">{props.book.price}</TableCell>
        <TableCell align="center"></TableCell>
        <TableCell align="center">{props.book.stock}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}
