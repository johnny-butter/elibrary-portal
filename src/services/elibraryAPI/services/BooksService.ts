/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookOut } from '../models/BookOut';
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

    /**
     * Collect Book
     * @param bookId 
     * @returns void 
     * @throws ApiError
     */
    public static booksApiCollectBook(
bookId: number,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/books/{book_id}/collect',
            path: {
                'book_id': bookId,
            },
        });
    }

    /**
     * Collected Books
     * @returns BookOut OK
     * @throws ApiError
     */
    public static booksApiCollectedBooks(): CancelablePromise<Array<BookOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/books/collected',
        });
    }

    /**
     * Collected Books Ids
     * @returns number OK
     * @throws ApiError
     */
    public static booksApiCollectedBooksIds(): CancelablePromise<Array<number>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/books/collected_ids',
        });
    }

}