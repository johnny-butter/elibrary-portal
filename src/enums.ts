export enum PaymentType {
  CreditCard = 'CreditCard',
  Transfer = 'Transfer',
}

export enum OrderState {
  Init = 'Init',
  Paid = 'Paid',
  Shipped = 'Shipped',
  Finished = 'Finished',
  Canceled = 'Canceled',
  Failed = 'Failed',
}
