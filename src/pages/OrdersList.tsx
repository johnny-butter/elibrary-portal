import { useState, useEffect } from 'react';

import { ApiError, OrdersService, OrderOut } from '../services/elibraryAPI';

import { Page } from './Page'
import { OrderRow } from '../components';

import {
  Grid,
  Stack,
  CircularProgress,
  Paper,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

const { ordersApiOrders } = OrdersService;

export const OrdersList = () => {
  const [orders, setOrders] = useState([] as OrderOut[]);

  useEffect(() => {
    ordersApiOrders()
      .then((resp: OrderOut[]) => {
        setOrders(resp);
      })
      .catch((err: ApiError) => {
        console.log(err);
      })
  }, []);

  let ordersPage: JSX.Element = orders.length === 0
    ? (
      <Grid item xs={12}>
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      </Grid>
    )
    : (
      <>
        <Grid item xs={12}>
          <Stack alignItems="center">
            <h2>ORDERS</h2>
          </Stack>
        </Grid>
        <TableContainer component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">PAYMENT TYPE</TableCell>
              <TableCell align="right">STATE</TableCell>
              <TableCell align="right">TOTAL PRICE</TableCell>
              <TableCell align="right">CREATED DATE</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => <OrderRow order={order}></OrderRow>)}
          </TableBody>
        </TableContainer>
      </>
    );

  return (
    <Page content={ordersPage}></Page>
  );
}
