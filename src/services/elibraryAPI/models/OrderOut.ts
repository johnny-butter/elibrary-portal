/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderedItem } from './OrderedItem';

export type OrderOut = {
    id?: number;
    state?: number;
    payment_type?: number;
    total_price: number;
    created_at?: string;
    ordered_items: Array<OrderedItem>;
};