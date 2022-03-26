/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderedItem } from './OrderedItem';

export type CheckoutCartOut = {
    order_id: number;
    total_price: number;
    items: Array<OrderedItem>;
};