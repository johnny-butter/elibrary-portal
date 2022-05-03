import { useEffect, useState } from 'react'

import { useHistory } from "react-router-dom";

import dropin from 'braintree-web-drop-in';

import { ApiError, OrdersService } from '../services/elibraryAPI';

import {
  AlertColor,
  Grid,
  Stack,
  Button,
} from '@mui/material';

const { ordersApiPay } = OrdersService;

interface INotifyProp {
  setSeverity: React.Dispatch<React.SetStateAction<AlertColor>>
  setContent: React.Dispatch<React.SetStateAction<string>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface IBraintreeDropInProp {
  orderId: number
  notifyProp: INotifyProp
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
          props.notifyProp.setSeverity('success');
          props.notifyProp.setContent('SUCCESS! REDIRECT TO HOME!');
          props.notifyProp.setOpen(true);

          setTimeout(() => { history.push('/'); }, 5000);
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
