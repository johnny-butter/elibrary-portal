/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderBook } from './OrderBook';

export type OrderedItem = {
    book: OrderBook;
    price: number;
    amount: number;
};