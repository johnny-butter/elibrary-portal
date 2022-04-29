/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CartBook } from './CartBook';

export type CartItem = {
    id: number;
    book: CartBook;
    price: number;
    amount: number;
};