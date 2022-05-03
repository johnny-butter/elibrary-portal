import { useState } from 'react';

import queryString from 'query-string';

import { PaymentType } from '../enums';

import { Page } from './Page'

import { BraintreeDropIn } from '../components';

import {
  AlertColor,
  Grid,
  Stack,
  CircularProgress,
} from '@mui/material';

export const Purchase = (): JSX.Element => {
  const [notifySeverity, setNotifySeverity] = useState('success' as AlertColor);
  const [notifyContent, setNotifyContent] = useState('');
  const [notifyOpen, setNotifyOpen] = useState(false);

  let notifyBarProp = {
    severity: notifySeverity,
    content: notifyContent,
    open: notifyOpen,
    setOpen: setNotifyOpen,
  };

  const queryParams = queryString.parse(window.location.search);
  const paymentType = queryParams.type?.toString();
  const orderId = Number(queryParams.id?.toString());

  let purchasePage: JSX.Element = (
    <Grid item xs={12}>
      <Stack alignItems="center">
        <CircularProgress />
      </Stack>
    </Grid>
  )

  switch (paymentType) {
    case PaymentType.CreditCard: {
      purchasePage = (
        <BraintreeDropIn
          orderId={orderId}
          notifyProp={{
            setSeverity: setNotifySeverity,
            setContent: setNotifyContent,
            setOpen: setNotifyOpen,
          }}/>
      )
      break;
    }
    case PaymentType.Transfer: {
      purchasePage = (
        <Grid item xs={12}>
          <Stack alignItems="center">
            <article>
              <h1>PLEASE FOLLOW THE STEPS BELOW:</h1>
              <p>1. TRANSFER THE MONEY TO ACCOUNT: 0000-1111-2222-3333</p>
              <p>2. INFORM US</p>
              <p>3. CONFIRM THE PAYMENT HAS BEEN RECEIVED</p>
              <p>4. MOVE TO NEXT STAGE (DELIVER)</p>
              <h3>THANK YOU FOR YOUR COOPERATION!</h3>
            </article>
          </Stack>
        </Grid>
      )
      break;
    }
  }

  return (
    <Page content={purchasePage} notifybarProp={notifyBarProp}></Page>
  );
}
