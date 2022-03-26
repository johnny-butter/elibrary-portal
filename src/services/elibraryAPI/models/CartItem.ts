/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Book } from './Book';

export type CartItem = {
    id: number;
    book: Book;
    price: number;
    amount: number;
};