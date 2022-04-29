import React from 'react';

import { useHistory } from "react-router-dom";

import { OrderState } from '../enums';

import {
  Box,
  Collapse,
  Typography,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  ButtonGroup,
  Button,
} from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { ApiError, OrdersService, OrderOut } from '../services/elibraryAPI';

import { convLocalTimeStr } from '../utils';

const { ordersApiCancel } = OrdersService;

interface IOrderRowProp {
  order: OrderOut
}

export const OrderRow = (props: IOrderRowProp) => {
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handlePay = () => {
    history.push(`/purchase?type=${props.order.payment_type}&id=${props.order.id}`)
  }

  const handleCancel = () => {
    ordersApiCancel({order_id: props.order.id})
      .then(() => { window.location.reload(); })
      .catch((err: ApiError) => { console.log(err); })
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand-row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{props.order.id}</TableCell>
        <TableCell align="right">{props.order.payment_type}</TableCell>
        <TableCell align="right">{props.order.state}</TableCell>
        <TableCell align="right">$ {props.order.total_price} NTD</TableCell>
        <TableCell align="right">{convLocalTimeStr(props.order.created_at ?? '', 'YYYY-MM-DD HH:mm:ss')}</TableCell>
        <TableCell>
        <ButtonGroup variant="outlined" aria-label="order-actions-btns">
          <Button onClick={handlePay} disabled={ ![OrderState.Init, OrderState.Failed].includes(props.order.state as OrderState) }>PAY</Button>
          <Button onClick={handleCancel} disabled={ ![OrderState.Init, OrderState.Failed].includes(props.order.state as OrderState) }>CANCEL</Button>
        </ButtonGroup>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                DETAILS
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>BOOK NAME</TableCell>
                    <TableCell>BOOK TYPE</TableCell>
                    <TableCell align="right">PRICE</TableCell>
                    <TableCell align="right">AMOUNT</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.order.ordered_items.map((item) => (
                    <TableRow>
                      <TableCell width={200}>{item.book.name}</TableCell>
                      <TableCell>{item.book.type}</TableCell>
                      <TableCell align="right">$ {item.price} NTD</TableCell>
                      <TableCell align="right">{item.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
