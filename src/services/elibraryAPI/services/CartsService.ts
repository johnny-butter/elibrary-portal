/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CartIn } from '../models/CartIn';
import type { CartOut } from '../models/CartOut';
import type { CheckoutCartIn } from '../models/CheckoutCartIn';
import type { CheckoutCartOut } from '../models/CheckoutCartOut';
import type { DeleteCartIn } from '../models/DeleteCartIn';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CartsService {

    /**
     * Get Cart
     * @returns CartOut OK
     * @throws ApiError
     */
    public static cartsApiGetCart(): CancelablePromise<CartOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/carts/',
        });
    }

    /**
     * Put Cart
     * @param requestBody 
     * @returns void 
     * @throws ApiError
     */
    public static cartsApiPutCart(
requestBody: CartIn,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/carts/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Delete Cart
     * @param requestBody 
     * @returns void 
     * @throws ApiError
     */
    public static cartsApiDeleteCart(
requestBody: DeleteCartIn,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/carts/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Checkout Cart
     * @param requestBody 
     * @returns CheckoutCartOut OK
     * @throws ApiError
     */
    public static cartsApiCheckoutCart(
requestBody: CheckoutCartIn,
): CancelablePromise<CheckoutCartOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/carts/checkout',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}