/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BookOut } from './BookOut';

export type PaginatedBooksOut = {
    total_pages: number;
    data: Array<BookOut>;
};