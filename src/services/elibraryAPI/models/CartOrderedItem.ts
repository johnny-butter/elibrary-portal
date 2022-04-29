/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CartBook } from './CartBook';

export type CartOrderedItem = {
    book: CartBook;
    price: number;
    amount: number;
};