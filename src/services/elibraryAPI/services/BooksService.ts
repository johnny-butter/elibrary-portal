/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedBooksOut } from '../models/PaginatedBooksOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BooksService {

    /**
     * Books
     * @param page 
     * @param pageSize 
     * @returns PaginatedBooksOut OK
     * @throws ApiError
     */
    public static booksApiBooks(
page: number,
pageSize: number = 9,
): CancelablePromise<PaginatedBooksOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/books/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }

}