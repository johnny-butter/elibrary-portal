import React, { useState, useEffect } from 'react';

import {
  TableRow,
  TableCell,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material';

import { notifyApiErr } from '../utils';

import { ApiError, CartsService, CartItem } from '../services/elibraryAPI';

const { cartsApiPutCart, cartsApiDeleteCart } = CartsService;

interface ICartItemRowProp {
  item: CartItem
  setNotifyMsg: React.Dispatch<React.SetStateAction<string>>
  setNotifyOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CartItemRow = (props: ICartItemRowProp) => {
  const [hidden, setHidden] = useState('table-row');
  const [amount, setAmount] = useState(0);

  const handleChange = (event: SelectChangeEvent<number>) => {
    let selectedNum = event.target.value as number

    if (selectedNum === 0) {
      cartsApiDeleteCart({cart_id: props.item.id})
        .then(() => {
          setHidden('none');
        })
        .catch((err: ApiError) => console.error(err))
        .finally(() => { return; });
    }

    cartsApiPutCart({book_id: props.item.book.id, amount: selectedNum})
      .then(() => { setAmount(selectedNum); })
      .catch((err: ApiError) => {
        notifyApiErr(err.body, props.setNotifyMsg, props.setNotifyOpen);
      })
  };

  useEffect(() => {
    setAmount(props.item.amount);
  // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <TableRow sx={{ display: hidden }}>
        <TableCell align="center">{props.item.book.name}</TableCell>
        <TableCell align="right">{props.item.price}</TableCell>
        <TableCell align="right">
          <Select
            labelId="book-amount-label"
            id="book-amount"
            value={amount}
            label="amount"
            onChange={handleChange}
          >
            { [0, 1, 2, 3, 4, 5].map((num: number) => <MenuItem value={num}>{num}</MenuItem>) }
          </Select>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
