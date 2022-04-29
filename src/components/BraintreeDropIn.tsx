import { useEffect, useState } from 'react'

import { useHistory } from "react-router-dom";

import dropin from 'braintree-web-drop-in';

import { ApiError, OrdersService } from '../services/elibraryAPI';

import {
  Grid,
  Stack,
  Button,
} from '@mui/material';

const { ordersApiPay } = OrdersService;

interface IBraintreeDropInProp {
  orderId: number
}

export const BraintreeDropIn = (props: IBraintreeDropInProp) => {
  const history = useHistory();

  const [braintreeInstance, setBraintreeInstance] = useState<dropin.Dropin | undefined>(undefined);
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    initBraintree();
  // eslint-disable-next-line
  }, [])

  const initBraintree = () => {
    dropin.create({
      authorization: process.env.REACT_APP_BRAINTREE_KEY ?? "",
      container: '#braintree-drop-in-div',
    }, (err, instance) => {
      if (err) {
        console.log(err);
        return;
      }
      setBraintreeInstance(instance);
      setBtnDisabled(false);
    });
  }

  const requestPaymentMethod = () => {
    if (!braintreeInstance) {
      return;
    }

    setBtnDisabled(true);

    braintreeInstance.requestPaymentMethod((err, payload) => {
      if (err) {
        console.log(err);
        return;
      }

      ordersApiPay({order_id: props.orderId, payment_method_nonce: payload.nonce})
        .then(() => {
          alert('SUCCESS! REDIRECT TO HOME!');
          history.push('/');
        })
        .catch((err: ApiError) => {
          console.log(err);
          setBtnDisabled(false);
        })
    });
  }

  return (
    <Grid item xs={12}>
      <Stack>
        <div id="braintree-drop-in-div" />

        <Button variant="outlined" onClick={requestPaymentMethod} disabled={btnDisabled}>PAY</Button>
      </Stack>
    </Grid>
  )
}
