import { useState, useEffect } from 'react';

import { ApiError, CartsService, CartOut, CartItem, CheckoutCartOut } from '../services/elibraryAPI';

import { Page } from './Page'

import {
  Box,
  Paper,
  Button,
  Radio,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,

} from '@mui/material';
import { blue } from '@mui/material/colors';

import { Notifybar, CartItemRow } from '../components';

const { cartsApiGetCart, cartsApiCheckoutCart } = CartsService;

export const Cart = (): JSX.Element => {
  const [notifyMsg, setNotifyMsg] = useState('');
  const [notifyOpen, setNotifyOpen] = useState(false);

  const [items, setItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(999999);

  const [orderTblHidden, setOrderTblHidden] = useState(true);
  const [paymentType, setPaymentType] = useState('CreditCard');

  useEffect(() => {
    cartsApiGetCart()
      .then((resp: CartOut) => {
        setItems(resp.data);
        setTotalPrice(resp.total_price);
      })
      .catch((err: ApiError) => console.log(err))
  }, []);

  const handleCheckout = () => {
    setOrderTblHidden(false);
  };

  const handleCheckoutConfirm = () => {
    cartsApiCheckoutCart({payment_type: paymentType})
      .then((resp: CheckoutCartOut) => {

      })
      .catch((err: ApiError) => console.log(err))

    setOrderTblHidden(false);
  };

  const handlePaymentType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentType(event.target.value);
  }

  let itemsList: JSX.Element = items.length === 0
    ? (<h2>GO <a href="/" style={{textDecoration: "none"}}>SHOPPING</a> NOW</h2>)
    : (
      <TableContainer component={Paper}>
        <Table aria-label="cart-table">
          <TableHead>
            <TableRow>
              <TableCell align="center">BOOK</TableCell>
              <TableCell align="right">PRICE</TableCell>
              <TableCell align="right">AMOUNT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { items.map((item) => <CartItemRow item={item} setNotifyMsg={setNotifyMsg} setNotifyOpen={setNotifyOpen} />) }
            <TableRow>
              <TableCell colSpan={1} />
              <TableCell align="right">TOTAL</TableCell>
              <TableCell align="right">$ {totalPrice} NTD</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} />
              <TableCell align="right">
                <Button
                  aria-label="cart-checkout"
                  variant="outlined"
                  onClick={handleCheckout}>
                    CHECKOUT
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );

  let orderTable: JSX.Element = (
    <TableContainer component={Paper} hidden={orderTblHidden}>
      <Table aria-label="order-table">
        <TableBody>
          <TableRow>
            <TableCell  sx={{ backgroundColor: blue[100] }}>RECEIVER</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    required
                    id="receiver-name"
                    label="NAME"
                  />
                  <TextField
                    required
                    id="receiver-phone"
                    label="PHONE"
                  />
                  <TextField
                    required
                    id="receiver-address"
                    label="ADDRESS"
                  />
                </div>
              </Box>
            </TableCell>
          </TableRow>
          <TableRow  sx={{ backgroundColor: blue[100] }}>
            <TableCell>PAYMENT TYPE</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
            <Radio
              checked={paymentType === 'CreditCard'}
              onChange={handlePaymentType}
              value="CreditCard"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'CreditCard' }}
            /> CREDIT CARD
            <Radio
              checked={paymentType === 'Transfer'}
              onChange={handlePaymentType}
              value="Transfer"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'Transfer' }}
            /> TRANSFER
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">
              <Button
                aria-label="cart-checkout-confirm"
                variant="outlined"
                onClick={handleCheckoutConfirm}>
                  CHECKOUT CONFIRM
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );

  let cartPage: JSX.Element = (
    <>
      <Notifybar severity='error' content={notifyMsg} open={notifyOpen} setOpen={setNotifyOpen} />
      {itemsList}
      <br />
      {orderTable}
      <br />
    </>
  );

  return (
    <Page content={cartPage}></Page>
  );
}
