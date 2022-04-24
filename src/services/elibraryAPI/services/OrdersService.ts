/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderIn } from '../models/OrderIn';
import type { OrderOut } from '../models/OrderOut';
import type { OrderPayIn } from '../models/OrderPayIn';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OrdersService {

    /**
     * Orders
     * @returns OrderOut OK
     * @throws ApiError
     */
    public static ordersApiOrders(): CancelablePromise<Array<OrderOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/orders/',
        });
    }

    /**
     * Pay
     * @param requestBody 
     * @returns void 
     * @throws ApiError
     */
    public static ordersApiPay(
requestBody: OrderPayIn,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/orders/pay',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Cancel
     * @param requestBody 
     * @returns void 
     * @throws ApiError
     */
    public static ordersApiCancel(
requestBody: OrderIn,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/orders/cancel',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}