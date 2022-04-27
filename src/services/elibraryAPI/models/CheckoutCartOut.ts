/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CartOrderedItem } from './CartOrderedItem';

export type CheckoutCartOut = {
    order_id: number;
    total_price: number;
    items: Array<CartOrderedItem>;
};